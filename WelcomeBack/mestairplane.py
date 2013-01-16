from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app
from google.appengine.ext import db

import logging
import json
import jinja2
import os
import simplejson

template_dir = "htmltemplates"
jinja_env = jinja2.Environment(loader = jinja2.FileSystemLoader(template_dir),
							   autoescape = True)

terrorist_watch_list = ['fred','sam','bill','eddie']

def render_str(template, **params):
	t = jinja_env.get_template(template)
	return t.render(params)

class RequestHandler(webapp.RequestHandler):
	"""
	Parent class for all other webpages.
	"""	
	def write(self, *a, **kw):
		self.response.out.write(*a, **kw)

	def render_str(self, template, **params):
		return render_str(template, **params)

	def render(self, template, **kw):
		self.write(self.render_str(template, **kw))

class PlaneHandler(RequestHandler):

	def get(self):
		self.render('seatmap.html')

	def post(self):
		#self.response.headers['Content-Type'] = 'application/jsonp'
		logging.error('hey')
		logging.error(self.request.get('data'))
		self.write(simplejson.dumps({'hey':'you'}.items()))

class JsonHandler(RequestHandler):

	def get(self):
		logging.error(self.request.get('airplane'))
		airplane = json.loads(self.request.get('airplane'))
		logging.error(len(airplane[0]))
		self.write(json.dumps(self.request.get('airplane')))

class SuccessHandler(RequestHandler):
	
	def get(self):
		self.out.write("Ready to fly")

class FailureHandler(RequestHandler):

	def post(self):
		self.response.headers['Content-Type'] = 'application/jsonp'
		self.out.write("Alert.  Terrorists present")

application = webapp.WSGIApplication([('/',PlaneHandler),
	('/checker',JsonHandler),
	('/success',SuccessHandler),
	('/failure',FailureHandler)
	],debug=True)


def main():
	run_wsgi_app(application)

if __name__ == "__main__":
	main()
