from pytorchcompiler import lambda_handler
import json

def load_json_from_file(file_path):
    with open(file_path, 'r') as file:
        return json.load(file)

def main():
    # Load event data from a JSON file
    event = load_json_from_file('test.json')
    
    # Simulate an AWS Lambda context (can be left as an empty dict for testing)
    context = {}

    # Call the lambda_handler function with the loaded event and context
    response = lambda_handler(event, context)

    # Print the response
    print("Response:")
    print(json.dumps(response, indent=4))

if __name__ == "__main__":
    main()
    
def tes():
  return