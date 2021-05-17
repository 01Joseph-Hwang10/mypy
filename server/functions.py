import os


def extract_recursively(basename, namelist, interface, save_directory):
    for name in namelist:
        full_name = basename + name
        if os.path.isdir(full_name):
            if full_name[-1] != '/':
                full_name += '/'
            with interface.open(full_name) as folder:
                new_namelist = os.listdir(folder.name)
                extract_recursively(folder.name, new_namelist, interface)
        else:
            interface.extract(full_name, save_directory + basename)
