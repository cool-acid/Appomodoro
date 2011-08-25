#!/usr/bin/env python
import os
from google.appengine.ext import webapp
from google.appengine.ext.webapp import template
from google.appengine.ext.webapp.util import run_wsgi_app

class Xmpp(webapp.RequestHandler):
    def get(self):
        path = os.path.join(os.path.dirname(__file__), 'xmpp.html')
        self.response.out.write(template.render(path, None))
class XMPPinvitation(webapp.RequestHandler):
    def get(self):
        from google.appengine.api import users
        from google.appengine.api import xmpp
        user = users.get_current_user()
        if user:
            jid = user.email()
            xmpp.send_invite(jid)
            self.response.out.write('OK, %s'%(jid))
        else:
            self.response.out.write('ERROR')
            
        
application = webapp.WSGIApplication([
    ('/xmpp', Xmpp),
    ('/xmppInvitation', XMPPinvitation)
    ], debug=True)

def main():
  run_wsgi_app(application)

if __name__ == '__main__':  
  main()