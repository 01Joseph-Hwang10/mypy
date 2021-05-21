
JSON = 'application/json'  # Markdown support + Log support

TXT = 'text/plain'
MD = 'text/markdown'  # HTML support

CSV = 'text/csv'  # Chart support, Later

BMP = 'image/bmp'
GIF = 'image/gif'
ICO = 'image/vnd.microsoft.icon'
JPG = 'image/jpeg'
PNG = 'image/png'
SVG = 'image/svg+xml'
TIF = 'image/tiff'
WEBP = 'image/webp'

PDF = 'application/pdf'

OUTPUT_TYPES = (
    JSON,
    TXT,
    MD,
    CSV,
    BMP,
    GIF,
    ICO,
    JPG,
    PNG,
    SVG,
    TIF,
    WEBP,
    PDF,
)

STR_TYPE = type(str())
INT_TYPE = type(int())
FLOAT_TYPE = type(float())
COMPLEX_TYPE = type(complex())
LIST_TYPE = type(list())
TUPLE_TYPE = type(tuple())
DICT_TYPE = type(dict())
SET_TYPE = type(set())
FROZENSET_TYPE = type(frozenset())
BOOL_TYPE = type(bool())

TYPE_CLASSES = (
    STR_TYPE,
    INT_TYPE,
    FLOAT_TYPE,
    COMPLEX_TYPE,
    LIST_TYPE,
    TUPLE_TYPE,
    DICT_TYPE,
    SET_TYPE,
    FROZENSET_TYPE,
    BOOL_TYPE,
)

STR = 'str'
INT = 'int'
FLOAT = 'float'
COMPLEX = 'complex'
LIST = 'list'
TUPLE = 'tuple'
DICT = 'dict'
SET = 'set'
FROZENSET = 'frozenset'
BOOL = 'bool'

TYPES = [
    STR,
    INT,
    FLOAT,
    COMPLEX,
    LIST,
    TUPLE,
    DICT,
    SET,
    FROZENSET,
    BOOL,
]
