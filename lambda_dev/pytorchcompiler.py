import json
import networkx as nx

LAYER_MAPPING = {
    "tabular-input": "nn.Identity", 
    "timeseries-input": "nn.Identity", 
    "image-input": "nn.Identity", 
    "tanh": "F.tanh",
    "relu": "F.relu",
    "sigmoid": "F.sigmoid",
    "linear": "nn.Linear",
    "conv1d": "nn.Conv1d",
    "conv2d": "nn.Conv2d",
    "lstm": "nn.LSTM",
    "gru": "nn.GRU",
    "maxpool1d": "nn.MaxPool1d",
    "maxpool2d": "nn.MaxPool2d",
    "layernorm": "nn.LayerNorm",
    "batchnorm1d": "nn.BatchNorm1d",
    "batchnorm2d": "nn.BatchNorm2d",
    "dropout": "nn.Dropout",
    "dropout1d": "nn.Dropout",
    "dropout2d": "nn.Dropout2d",
    "permute": "torch.permute",
    "concat": "torch.cat",
    "flatten": "torch.flatten",
}

def parse_json(nodes_json, edges_json):
    try:
        nodes = {node["id"]: node for node in nodes_json}
        edges = edges_json
        return nodes, edges
    except (TypeError, KeyError) as e:
        raise ValueError(f"Invalid JSON format: {e}")

def process_node_data(node):
    try:
        for key, value in node['data'].items():
            if value is None:
                return None
        input_shape = node['data'].get('inputShape', '')
        if input_shape:
            shape_parts = input_shape.replace('(', '').replace(')', '').split(',')
            shape_parts = [part.strip() for part in shape_parts]
            shape_numbers = [int(part) for part in shape_parts]
            return shape_numbers
        return None
    except (ValueError, KeyError) as e:
        raise ValueError(f"Error processing node data: {e}")

def generate_pytorch_model(nodes, edges):
    G = nx.DiGraph()

    for node_id, node in nodes.items():
        G.add_node(node_id)

    for edge in edges:
        G.add_edge(edge["source"], edge["target"])

    sorted_node_ids = list(nx.topological_sort(G))
    
    layers = []
    forward_layers = []
    
    conv_layer_num = 1
    rnn_layer_num = 1
    linear_layer_num = 1
    pool_layer_num = 1
    norm_layer_num = 1
    dropout_layer_num = 1
    
    input_vars = {}
    variable_map = {}
    input_counter = 1
    output_vars = []

    need_torch = False
    need_functional = False

    for node_id in sorted_node_ids:
        node = nodes[node_id]
        node_type = node["type"]
        layer_class = LAYER_MAPPING.get(node_type, "UnknownLayer")

        input_shape = process_node_data(node)
        if input_shape is None and node_type.find("input") == -1:
            continue

        nd = node["data"]
        forward = None
        layer = None

        predecessors = list(G.predecessors(node_id))
        successors = list(G.successors(node_id))
        siblings = list(set(child for parent in G.predecessors(node_id) for child in G.successors(parent) if child != node_id))
        
        if len(predecessors) == 0: # input node, no parent
            var_name = f"x{input_counter}"
            input_counter += 1
            input_vars[node_id] = var_name
        elif len(predecessors) == 1: # single parent
            parent_var = variable_map[predecessors[0]]
            var_name = parent_var
        else:
            pass # Handle multiple input nodes at layer definition
           
        if len(predecessors) > 1 or len(siblings) > 0:
            var_name = f"x{input_counter}"
            input_counter += 1
            
        if len(successors) == 0:
            output_vars.append(var_name)

        variable_map[node_id] = var_name

        if layer_class == "nn.Linear":
            layer_num = linear_layer_num
            linear_layer_num += 1
            layer_name = f"self.linear_{layer_num}"
            layer = f"{layer_name} = nn.Linear(in_features={input_shape[-1]}, out_features={nd['numNeurons']}, bias={nd['bias']})"
            forward = f"{var_name} = {layer_name}({parent_var})"
        elif layer_class == "F.relu":
            need_functional = True
            forward = f"{var_name} = F.relu({parent_var}, inplace={nd.get('inplace', False)})"
        elif layer_class == "F.tanh":
            need_functional = True
            forward = f"{var_name} = F.tanh({parent_var})"
        elif layer_class == "F.sigmoid":
            need_functional = True
            forward = f"{var_name} = F.sigmoid({parent_var})"
        elif layer_class == "nn.Conv1d":
            layer_num = conv_layer_num
            conv_layer_num += 1
            layer_name = f"self.conv_{layer_num}"
            layer = (f"{layer_name} = nn.Conv1d(in_channels={input_shape[1]}, out_channels={nd['numFilters']}, "
                     f"kernel_size={nd['kernelSize']}, stride={nd['stride']}, "
                     f"padding={nd['padding']}, dilation={nd['dilation']})")
            forward = f"{var_name} = {layer_name}({parent_var})"
        elif layer_class == "nn.Conv2d":
            layer_num = conv_layer_num
            conv_layer_num += 1
            layer_name = f"self.conv_{layer_num}"
            layer = (f"{layer_name} = nn.Conv2d(in_channels={input_shape[1]}, out_channels={nd['numFilters']}, "
                     f"kernel_size={nd['kernelSize']}, stride={nd['stride']}, "
                     f"padding={nd['padding']}, dilation={nd['dilation']})")
            forward = f"{var_name} = {layer_name}({parent_var})"
        elif layer_class == "nn.Dropout":
            layer_num = dropout_layer_num
            dropout_layer_num += 1
            layer_name = f"self.dropout_{layer_num}"
            layer = f"{layer_name} = nn.Dropout(p={nd['p']}, inplace={nd.get('inplace', False)})"
            forward = f"{var_name} = {layer_name}({parent_var})"
        elif layer_class == "nn.Dropout1d":
            layer_num = dropout_layer_num
            dropout_layer_num += 1
            layer_name = f"self.dropout_{layer_num}"
            layer = f"{layer_name} = nn.Dropout1d(p={nd['p']}, inplace={nd.get('inplace', False)})"
            forward = f"{var_name} = {layer_name}({parent_var})"
        elif layer_class == "nn.Dropout2d":
            layer_num = dropout_layer_num
            dropout_layer_num += 1
            layer_name = f"self.dropout_{layer_num}"
            layer = f"{layer_name} = nn.Dropout2d(p={nd['p']}, inplace={nd.get('inplace', False)})"
            forward = f"{var_name} = {layer_name}({parent_var})"
        elif layer_class == "nn.LayerNorm":
            layer_num = norm_layer_num
            norm_layer_num += 1
            layer_name = f"self.norm_{layer_num}"
            start_dim = nd['normalizedShape']
            normalized_shape = input_shape[start_dim:]
            layer = f"{layer_name} = nn.LayerNorm(normalized_shape={normalized_shape}, eps={nd['eps']}, elementwise_affine={nd['elementwiseAffine']})"
            forward = f"{var_name} = {layer_name}({parent_var})"
        elif layer_class == "nn.BatchNorm1d":
            layer_num = norm_layer_num
            norm_layer_num += 1
            layer_name = f"self.norm_{layer_num}"
            layer = (f"{layer_name} = nn.BatchNorm1d(num_features={input_shape[1]}, eps={node['data']['eps']}, "
                     f"momentum={node['data']['momentum']}, affine={node['data']['affine']}, "
                     f"track_running_stats={node['data']['track_running_stats']})")
            forward = f"{var_name} = {layer_name}({parent_var})"
        elif layer_class == "nn.BatchNorm2d":
            layer_num = norm_layer_num
            norm_layer_num += 1
            layer_name = f"self.norm_{layer_num}"
            layer = (f"{layer_name} = nn.BatchNorm2d(num_features={input_shape[1]}, eps={node['data']['eps']}, "
                     f"momentum={node['data']['momentum']}, affine={node['data']['affine']}, "
                     f"track_running_stats={node['data']['track_running_stats']})")
            forward = f"{var_name} = {layer_name}({parent_var})"
        elif layer_class == "nn.MaxPool1d":
            layer_num = pool_layer_num
            pool_layer_num += 1
            layer_name = f"self.pool_{layer_num}"
            layer = (f"{layer_name} = nn.MaxPool1d(kernel_size={node['data']['kernelSize']}, stride={node['data']['stride']}, "
                     f"padding={node['data']['padding']}, dilation={node['data']['dilation']})")
            forward = f"{var_name} = {layer_name}({parent_var})"
        elif layer_class == "nn.MaxPool2d":
            layer_num = pool_layer_num
            pool_layer_num += 1
            layer_name = f"self.pool_{layer_num}"
            layer = (f"{layer_name} = nn.MaxPool2d(kernel_size={nd['kernelSize']}, stride={nd['stride']}, "
                     f"padding={nd['padding']}, dilation={nd['dilation']})")
            forward = f"{var_name} = {layer_name}({parent_var})"
        elif layer_class == "nn.LSTM":
            layer_num = rnn_layer_num
            rnn_layer_num += 1
            layer_name = f"self.rnn_{layer_num}"
            layer = (f"{layer_name} = nn.LSTM(input_size={input_shape[-1]}, hidden_size={nd['hiddenSize']}, "
                     f"num_layers={nd['numLayers']}, dropout={nd['dropout']}, "
                     f"bidirectional={nd['bidirectional']})")
            forward = f"{var_name}, _ = {layer_name}({parent_var})"
        elif layer_class == "nn.GRU":
            layer_num = rnn_layer_num
            rnn_layer_num += 1
            layer_name = f"self.rnn_{layer_num}"
            layer = (f"{layer_name} = nn.GRU(input_size={input_shape[-1]}, hidden_size={node['data']['hiddenSize']}, "
                     f"num_layers={node['data']['numLayers']}, dropout={node['data']['dropout']}, "
                     f"bidirectional={node['data']['bidirectional']}, batch_first=True)")
            forward = f"{var_name} = {layer_name}({parent_var})"
        elif layer_class == "torch.flatten":
            need_torch = True
            forward = f"{var_name} = torch.flatten(input={parent_var}, start_dim={nd['flattenStart']}, end_dim={nd['flattenEnd']})"
        elif layer_class == "torch.cat":
            need_torch = True
            tensors = [variable_map[source] for source in predecessors]
            forward = f"{var_name} = torch.cat(tensors=[{', '.join(tensors)}], dim={nd['dim']})"
        elif layer_class == "torch.permute":
            need_torch = True
            indexes = [nd["inputShapeOrder"].index(dim) for dim in nd["outputShapeOrder"]]
            forward = f"{var_name} = torch.permute(input={parent_var}, {tuple(indexes)})"
        elif layer_class == "nn.Identity":
            pass
        else:
            layer = f"UnknownLayer({nd})"
            print("Unknown layer:", node)

        if layer is not None:
            layers.append(layer)
        if forward is not None:
            forward_layers.append(forward)

    init_layers = "\n        ".join(layers)
    forward_code = "\n        ".join(forward_layers)
    input_definitions = ", ".join(input_vars.values())
    output_definitions = ", ".join(output_vars)

    model_code_parts = []

    if need_torch:
        model_code_parts.append("import torch")
    model_code_parts.append("import torch.nn as nn")
    if need_functional:
        model_code_parts.append("import torch.nn.functional as F")

    model_code_parts.append("""
class CustomModel(nn.Module):
    def __init__(self):
        super(CustomModel, self).__init__()""")

    if init_layers:
        model_code_parts.append(f"        {init_layers}")

    model_code_parts.append(f"""
    def forward(self{", " + input_definitions if input_definitions!="" else ""}):""")

    if forward_code:
        model_code_parts.append(f"        {forward_code}")
    if len(output_vars) > 1:
        output_return = output_definitions
    elif len(output_vars) == 1:
        output_return = output_vars[0]
    else:
        output_return = ""
    print("here3")

    model_code_parts.append(f"        return {output_return}")

    model_code = "\n".join(model_code_parts)

    if input_counter <= 2:
        model_code = model_code.replace("x1", "x")
    return model_code

def lambda_handler(event, context):
    try:
        nodes_json = event.get('nodes')
        edges_json = event.get('edges')

        nodes, edges = parse_json(nodes_json, edges_json)
        model_code = generate_pytorch_model(nodes, edges)

        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            },
            'body': json.dumps({'model_code': model_code})
        }

    except ValueError as e:
        return {
            'statusCode': 400,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            },
            'body': json.dumps(f'Error processing input: {e}')
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            },
            'body': json.dumps(f'Internal server error: {e}')
        }

