
# -*- coding: utf-8 -*-
import os
import re
from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app

class Czz(webapp.RequestHandler):
    def get(self, tail = ''):
        lista = []
        final = ''
        procesado = ''
        multispace = re.compile(' +', re.M)
        separadores = re.compile('\s*([;:{}])\s*', re.M)
        comentarios = re.compile('\/\*.*?\*\/', re.M | re.S)
        self.response.headers['Content-Type'] = 'text/css; charset=utf-8'
        if tail[-4:] == '.css':
            lista = tail[:-4].split('%2C')
            for hoja in lista:
                path = os.path.join(os.path.dirname(__file__), 'czz/' + hoja + '.css')
                titulo = '\n\n/*======== '+ hoja + '.css ========*/\n'
                try:
                    with open(path, 'U') as elCSS:
                        procesado = elCSS.read()
                        procesado = multispace.sub(' ', procesado)
                        procesado = separadores.sub(r'\1', procesado)
                        procesado = comentarios.sub('', procesado)
                        procesado = procesado.replace("\n", "")
                        procesado = titulo + procesado
                    final+=procesado
                    procesado = ''
                except IOError:
                    final += titulo + "\n/*ERROR: No se pudo abrir el archivo*/\n"
            
            self.response.out.write(final)
        else:            
            self.response.out.write("/*ERROR EN URL*/")
                        
                    
        
application = webapp.WSGIApplication(
    [
        (r'^/czz/(.*)', Czz)
    ])

def main():
   run_wsgi_app(application)

if __name__ == "__main__":
    main()