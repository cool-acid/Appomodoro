tail = 'mstyle%2Cstyle.css'

import os
import re
final = ''
procesado = ''
whitespace = re.compile('^\s+$')
multispace = re.compile(' +', re.M)
sep1 = re.compile('\s*;\s*', re.M)
sep2 = re.compile('\s*:\s*', re.M)
sep3 = re.compile('\s*{\s*', re.M)
sep4 = re.compile('\s*}\s*', re.M)
sep5 = re.compile('\s*,\s*', re.M)
comentarios = re.compile('\/\*.*?\*\/', re.M | re.S)
enters = re.compile('\n', re.M)
if tail[-4:] == '.css':
    lista = tail[:-4].split('%2C')
    for hoja in lista:
        path = os.path.join(os.path.dirname(__file__), 'czz/' + hoja + '.css')
        titulo = '\n\n/*======== '+ hoja + '.css ========*/\n'
        with open(path) as elCSS:
            procesado = elCSS.read()
            procesado = multispace.sub(' ', procesado)
            procesado = sep1.sub(';', procesado)
            procesado = sep2.sub(':', procesado)
            procesado = sep3.sub('{', procesado)
            procesado = sep4.sub('}', procesado)
            procesado = sep5.sub(',', procesado)
            procesado = comentarios.sub('', procesado)
            procesado = procesado.replace("\n", "")
            procesado = titulo + procesado
        final+=procesado
        procesado = ''
            
print(final)