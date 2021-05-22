from flask_apscheduler import APScheduler
import subprocess
import os
import re
from __db import db, App
from __config import UPLOAD_ROOT


scheduler = APScheduler()


@scheduler.task('interval', hour=2, id='storage_manager')
def storage_manager():

    subp1 = subprocess.Popen(
        ['docker', 'ps', '-s'],
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT
    )
    subp1.wait()

    process_output, _ = subp1.communicate()
    process_output = process_output.decode('utf-8')

    output_lines = process_output.split('\n')
    del output_lines[0]

    for lines in output_lines:
        infos = lines.split(' ')
        if infos[-1][-1] == ')':
            size_raw = infos[-3]
            name = infos[-4]
        else:
            size_raw = infos[-1]
            name = infos[-2]
        size = float(''.join([char for char in size_raw if char.isnumeric()]))
        unit = ''.join([char for char in size_raw if not char.isnumeric()])
        if (
            unit.lower() not in ['b', 'kb', 'mb'] or
            (
                unit.lower() == 'mb' and
                size < 11
            )
        ):
            splitted = name.split('_')
            regex = re.compile('server')
            server_app_id = False
            for i in splitted:
                does_exist = regex.search(i)
                if does_exist:
                    app_id_target = i.replace('server', '')
                    try:
                        server_app_id = int(app_id_target)
                    except:
                        pass
            if server_app_id:
                app = App.query.filter_by(app_id=server_app_id)
                if app:
                    db.session.delete(app[0])
                    db.session.commit()
                save_directory = os.path.join(UPLOAD_ROOT, server_app_id)
                subp2 = subprocess.Popen(
                    ['docker-compose', 'down'], cwd=save_directory
                )
                subp2.wait()
            else:
                container_id = lines[0]
                subp2 = subprocess.Popen(
                    ['docker', 'rm', container_id]
                )
                subp2.wait()
