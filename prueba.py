tail = 'mstyle%2Cstyle.css'

import os
import re
final = ''
procesado = ''
multispace = re.compile(' +', re.M)
separadores = re.compile('\s*([;:{}])\s*', re.M)
comentarios = re.compile('\/\*.*?\*\/', re.M | re.S)
if tail[-4:] == '.css':
    lista = tail[:-4].split('%2C')
    for hoja in lista:
        path = os.path.join(os.path.dirname(__file__), 'czz/' + hoja + '.css')
        titulo = '\n\n/*======== '+ hoja + '.css ========*/\n'
        with open(path) as elCSS:
            procesado = elCSS.read()
            procesado = multispace.sub(' ', procesado)
            procesado = separadores.sub(r'\1', procesado)
            procesado = comentarios.sub('', procesado)
            procesado = procesado.replace("\n", "")
            procesado = titulo + procesado
        final+=procesado
        procesado = ''
            
print(final)