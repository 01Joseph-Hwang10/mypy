import os
from config.settings import DEBUG, STATICFILES_DIRS, STATIC_ROOT


STR = 'str'
INT = 'int'
FLOAT = 'float'
# COMPLEX = 'complex'
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
#     COMPLEX,
    LIST,
    TUPLE,
    DICT,
    SET,
    FROZENSET,
    BOOL,
]

STR_TYPE = str()
INT_TYPE = int()
FLOAT_TYPE = float()
# COMPLEX_TYPE = complex()
LIST_TYPE = list()
TUPLE_TYPE = tuple()
DICT_TYPE = dict()
SET_TYPE = set()
FROZENSET_TYPE = frozenset()
BOOL_TYPE = bool()

TYPE_CLASSES = [
    STR_TYPE,
    INT_TYPE,
    FLOAT_TYPE,
#     COMPLEX_TYPE,
    LIST_TYPE,
    TUPLE_TYPE,
    DICT_TYPE,
    SET_TYPE,
    FROZENSET_TYPE,
    BOOL_TYPE,
]


TYPES_CHOICES = (
    (STR, 'String'),
    (INT, 'Integer'),
    (FLOAT, 'Float'),
#     (COMPLEX, 'Complex Number'),
    (LIST, 'List'),
    (TUPLE, 'Tuple'),
    (DICT, 'Dictionary'),
    (SET, 'Set'),
    (FROZENSET, 'Frozenset'),
    (BOOL, 'Boolean'),
)

if DEBUG:
    STATIC_PATH = STATICFILES_DIRS[0]
else:
    STATIC_PATH = STATIC_ROOT

banned_extension_source = os.path.join(
    STATIC_PATH, 'src/banned_extensions.txt')

with open(banned_extension_source, 'r') as f:

    BANNED_EXTENSIONS = [
        str(extension).replace(' ', '')[:-1] for extension in f.readlines()
    ]


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
    # CSV,
    # BMP,
    # GIF,
    # ICO,
    JPG,
    PNG,
    # SVG,
    # TIF,
    # WEBP,
    # PDF,
)

OUTPUT_TYPES_CHOICES = (
    (JSON, '.json'),
    (TXT, '.txt'),
    (CSV, '.csv'),
    (MD, '.md'),
    (BMP, '.bmp'),
    (GIF, '.gif'),
    (ICO, '.ico'),
    (JPG, '.jpg'),
    (JPG, '.jpeg'),
    (PNG, '.png'),
    (SVG, '.svg'),
    (TIF, '.tif'),
    (TIF, '.tiff'),
    (WEBP, '.webp'),
    (PDF, '.pdf')
)


SINGLE_CHOICE = 'SINGLE_CHOICE'
MULTIPLE_CHOICE = 'MULTIPLE_CHOICE'

INPUT_EXTRATYPES = [
    (SINGLE_CHOICE, 'Single Choice'),
    (MULTIPLE_CHOICE, 'Multiple Choice')
]
