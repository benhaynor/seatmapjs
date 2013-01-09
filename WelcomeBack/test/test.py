from selenium import webdriver
import unittest

HOST='http://localhost:8080'

class AirplaneTester(unittest.TestCase):
	
	def setUp(self):
		self.browser = webdriver.Firefox()
		self.browser.get('%s/seatmap' % HOST) 

	def tearDown(self):
		self.browser.close()
	
	def tst_ids(self):
		for row in range(1,19):
			for seat in ['a','b','c','d']:
				if seat == 'a' and row == 18:
					print 'hey'
				seat_id = "%d%s" % (row, seat)
				try:
					self.browser.find_element_by_id(seat_id)
				except NoSuchElementException:
					self.fail("Couldn't find seat with id %s" % seat_id)

	def test_json(self):
		self.browser.execute_script('window.airplaneJSON = airplane.tojson();')
		json = self.browser.execute_script('return window.airplaneJSON;')
		
	def tst_clicking(self):
	    for seat, passenger in [('1a','Ben'),('2a','Rowdy')]:
	        self.browser.find_element_by_id(seat).click()
	        alert = self.browser.switch_to_alert()
	        alert.send_keys(passenger)
	        alert.accept()
	    self.browser.execute_script('window.airplaneJSON = airplane.tojson()')

if __name__ == '__main__':
	unittest.main()
