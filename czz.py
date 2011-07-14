import os
import re
from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app

class Czz(webapp.RequestHandler):
    def get(self, tail = ''):
        lista = []
        whitespace = re.compile('^\s+$')
        multispace = re.compile(' +','M')
        self.response.headers['Content-Type'] = 'text/css'
        if tail[-4:] == '.css':
            lista = tail[:-4].split('%2C')
            for hoja in lista:
                path = os.path.join(os.path.dirname(__file__), 'czz/' + hoja + '.css')
#                path = os.path.join(os.path.dirname(__file__), 'index.html')
                self.response.out.write(path)
                self.response.out.write('/*======== '+ hoja + '.css ========*/')
#                    with open(path,'r') as original:
#                        self.response.out.write("OK!")
                miCSS = open(path)
                print(miCSS)
                for unaLinea in miCSS:
                    if not whitespace.match(unaLinea):
#                       Se supone que esto es para quitar lineas en blanco.
                        self.response.out.write(unaLinea)
                    
                        
                    
        
application = webapp.WSGIApplication(
    [
        (r'^/czz/(.*)', Czz)
    ])

def main():
   run_wsgi_app(application)

if __name__ == "__main__":
    main()