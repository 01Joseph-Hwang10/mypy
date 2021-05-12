import os
from config.settings import DEBUG, STATICFILES_DIRS, STATIC_ROOT


STR = 'str'
INT = 'int'
FLOAT = 'float'
COMPLEX = 'complex'
LIST = 'list'
TUPLE = 'tuple'
RANGE = 'range'
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
    RANGE,
    DICT,
    SET,
    FROZENSET,
    BOOL,
]

TYPES_CHOICES = (
    (STR, 'String'),
    (INT, 'Integer'),
    (FLOAT, 'Float'),
    (COMPLEX, 'Complex Number'),
    (LIST, 'List'),
    (TUPLE, 'Tuple'),
    (RANGE, 'Range'),
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
