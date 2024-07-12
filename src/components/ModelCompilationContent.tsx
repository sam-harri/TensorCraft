import FrameworkDropdown from "./FrameworkDropdown";
import SyntaxHighlighter from "react-syntax-highlighter";

// @ts-ignore
const atomOneDark = {
    "hljs": {
        "display": "block",
        "overflowX": "auto",
        "padding": "0.5em",
        "color": "#abb2bf",
        "background": "#282c34",
        "height": "100%",
        "-ms-overflow-style": "none",
        "scrollbar-width": "none"
    },
    "hljs::-webkit-scrollbar" : {
       " display": "none"
    },
    "hljs-comment": {
        "color": "#5c6370",
        "fontStyle": "italic"
    },
    "hljs-quote": {
        "color": "#5c6370",
        "fontStyle": "italic"
    },
    "hljs-doctag": {
        "color": "#c678dd"
    },
    "hljs-keyword": {
        "color": "#c678dd"
    },
    "hljs-formula": {
        "color": "#c678dd"
    },
    "hljs-section": {
        "color": "#e06c75"
    },
    "hljs-name": {
        "color": "#e06c75"
    },
    "hljs-selector-tag": {
        "color": "#e06c75"
    },
    "hljs-deletion": {
        "color": "#e06c75"
    },
    "hljs-subst": {
        "color": "#e06c75"
    },
    "hljs-literal": {
        "color": "#56b6c2"
    },
    "hljs-string": {
        "color": "#98c379"
    },
    "hljs-regexp": {
        "color": "#98c379"
    },
    "hljs-addition": {
        "color": "#98c379"
    },
    "hljs-attribute": {
        "color": "#98c379"
    },
    "hljs-meta-string": {
        "color": "#98c379"
    },
    "hljs-built_in": {
        "color": "#e6c07b"
    },
    "hljs-class .hljs-title": {
        "color": "#e6c07b"
    },
    "hljs-attr": {
        "color": "#d19a66"
    },
    "hljs-variable": {
        "color": "#d19a66"
    },
    "hljs-template-variable": {
        "color": "#d19a66"
    },
    "hljs-type": {
        "color": "#d19a66"
    },
    "hljs-selector-class": {
        "color": "#d19a66"
    },
    "hljs-selector-attr": {
        "color": "#d19a66"
    },
    "hljs-selector-pseudo": {
        "color": "#d19a66"
    },
    "hljs-number": {
        "color": "#d19a66"
    },
    "hljs-symbol": {
        "color": "#61aeee"
    },
    "hljs-bullet": {
        "color": "#61aeee"
    },
    "hljs-link": {
        "color": "#61aeee",
        "textDecoration": "underline"
    },
    "hljs-meta": {
        "color": "#61aeee"
    },
    "hljs-selector-id": {
        "color": "#61aeee"
    },
    "hljs-title": {
        "color": "#61aeee"
    },
    "hljs-emphasis": {
        "fontStyle": "italic"
    },
    "hljs-strong": {
        "fontWeight": "bold"
    }
} 

const ModelCompilationContent: React.FC = () => {
  const codeString = `import math
import torch
import torch.nn as nn
import torch.nn.functional as F

class RNNModel(nn.Module):

    def __init__(self, rnn_type : string, ntoken, ninp, nhid, nlayers, dropout=0.5, tie_weights=False):
        super(RNNModel, self).__init__()
        self.ntoken = ntoken
        self.drop = nn.Dropout(dropout)
        self.encoder = nn.Embedding(ntoken, ninp)
        if rnn_type in ['LSTM', 'GRU']:
            self.rnn = getattr(nn, rnn_type)(ninp, nhid, nlayers, dropout=dropout)
        else:
            try:
                nonlinearity = {'RNN_TANH': 'tanh', 'RNN_RELU': 'relu'}[rnn_type]
            except KeyError as e:
                raise ValueError( """An invalid option for --model was supplied,
                                 options are ['LSTM', 'GRU', 'RNN_TANH' or 'RNN_RELU']""") from e
            self.rnn = nn.RNN(ninp, nhid, nlayers, nonlinearity=nonlinearity, dropout=dropout)
        self.decoder = nn.Linear(nhid, ntoken)
        # Optionally tie weights as in:
        # "Using the Output Embedding to Improve Language Models" (Press & Wolf 2016)
        # https://arxiv.org/abs/1608.05859
        # and
        # "Tying Word Vectors and Word Classifiers: A Loss Framework for Language Modeling" (Inan et al. 2016)
        # https://arxiv.org/abs/1611.01462
        if tie_weights:
            if nhid != ninp:
                raise ValueError('When using the tied flag, nhid must be equal to emsize')
            self.decoder.weight = self.encoder.weight

        self.init_weights()

        self.rnn_type = rnn_type
        self.nhid = nhid
        self.nlayers = nlayers

    def init_weights(self):
        initrange = 0.1
        nn.init.uniform_(self.encoder.weight, -initrange, initrange)
        nn.init.zeros_(self.decoder.bias)
        nn.init.uniform_(self.decoder.weight, -initrange, initrange)

    def forward(self, input, hidden):
        emb = self.drop(self.encoder(input))
        output, hidden = self.rnn(emb, hidden)
        output = self.drop(output)
        decoded = self.decoder(output)
        decoded = decoded.view(-1, self.ntoken)
        return F.log_softmax(decoded, dim=1), hidden

    def init_hidden(self, bsz):
        weight = next(self.parameters())
        if self.rnn_type == 'LSTM':
            return (weight.new_zeros(self.nlayers, bsz, self.nhid),
                    weight.new_zeros(self.nlayers, bsz, self.nhid))
        else:
            return weight.new_zeros(self.nlayers, bsz, self.nhid)

# Temporarily leave PositionalEncoding module here. Will be moved somewhere else.
class PositionalEncoding(nn.Module):
    r"""Inject some information about the relative or absolute position of the tokens in the sequence.
        The positional encodings have the same dimension as the embeddings, so that the two can be summed.
        Here, we use sine and cosine functions of different frequencies.
    .. math:
        \text{PosEncoder}(pos, 2i) = sin(pos/10000^(2i/d_model))
        \text{PosEncoder}(pos, 2i+1) = cos(pos/10000^(2i/d_model))
        \text{where pos is the word position and i is the embed idx)
    Args:
        d_model: the embed dim (required).
        dropout: the dropout value (default=0.1).
        max_len: the max. length of the incoming sequence 00).
    Examples:
        >>> pos_encoder = PositionalEncoding(d_model)
    """

    def __init__(self, d_model, dropout=0.1,00):
        super(PositionalEncoding, self).__init__()
        self.dropout = nn.Dropout(p=dropout)

        pe = torch.zeros(max_len, d_model)
        position = torch.arange(0, max_len, dtype=torch.float).unsqueeze(1)
        div_term = torch.exp(torch.arange(0, d_model, 2).float() * (-math.log(10000.0) / d_model))
        pe[:, 0::2] = torch.sin(position * div_term)
        pe[:, 1::2] = torch.cos(position * div_term)
        pe = pe.unsqueeze(0).transpose(0, 1)
        self.register_buffer('pe', pe)

    def forward(self, x):
        r"""Inputs of forward function
        Args:
            x: the sequence fed to the positional encoder model (required).
        Shape:
            x: [sequence length, batch size, embed dim]
            output: [sequence length, batch size, embed dim]
        Examples:
            >>> output = pos_encoder(x)
        """

        x = x + self.pe[:x.size(0), :]
        return self.dropout(x)

class TransformerModel(nn.Transformer):
    """Container module with an encoder, a recurrent or transformer module, and a decoder."""

    def __init__(self, ntoken, ninp, nhead, nhid, nlayers, dropout=0.5):
        super(TransformerModel, self).__init__(d_model=ninp, nhead=nhead, dim_feedforward=nhid, num_encoder_layers=nlayers)
        self.model_type = 'Transformer'
        self.src_mask = None
        self.pos_encoder = PositionalEncoding(ninp, dropout)

        self.input_emb = nn.Embedding(ntoken, ninp)
        self.ninp = ninp
        self.decoder = nn.Linear(ninp, ntoken)

        self.init_weights()

    def _generate_square_subsequent_mask(self, sz):
        return torch.log(torch.tril(torch.ones(sz,sz)))

    def init_weights(self):
        initrange = 0.1
        nn.init.uniform_(self.input_emb.weight, -initrange, initrange)
        nn.init.zeros_(self.decoder.bias)
        nn.init.uniform_(self.decoder.weight, -initrange, initrange)

    def forward(self, src, has_mask=True):
        if has_mask:
            device = src.device
            if self.src_mask is None or self.src_mask.size(0) != len(src):
                mask = self._generate_square_subsequent_mask(len(src)).to(device)
                self.src_mask = mask
        else:
            self.src_mask = None

        src = self.input_emb(src) * math.sqrt(self.ninp)
        src = self.pos_encoder(src)
        output = self.encoder(src, mask=self.src_mask)
        output = self.decoder(output)
        return F.log_softmax(output, dim=-1)
  `;

  return (
    <div className="flex flex-col h-full mx-6">
      <div className="flex-none">
        <FrameworkDropdown />
      </div>
      <div className="flex-none">
        <div className="w-full bg-slate-900 border-t border-x-3 rounded-t-lg h-6 opacity-85"></div>
      </div>
      <div className="flex-1 overflow-auto hide-scrollbar">
        <SyntaxHighlighter language="python"
        // @ts-ignore super weird issue with the react-highlighter package, it's not recognizing the style prop type as valid
        style={atomOneDark}
        showLineNumbers={true}
        wrapLongLines={true}>
        {codeString}
        </SyntaxHighlighter>
      </div>
      <div className="flex-none">
        <div className="w-full bg-slate-900 border-b border-x-3 rounded-b-lg h-6 opacity-85 mb-6"></div>
      </div>
    </div>
  );
};

export default ModelCompilationContent;
