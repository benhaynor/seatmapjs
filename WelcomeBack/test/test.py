from selenium import webdriver
import unittest
import time

HOST='http://localhost:8080'

class AirplaneTester(unittest.TestCase):
	
	@classmethod
	def setUpClass(self):
		self.browser = webdriver.Firefox()
	
	def setUp(self):
		self.browser.get(HOST) 
	
	@classmethod
	def tearDownClass(self):
		self.browser.close()
	
	def test_ids(self):
		for row in range(1,19):
			for seat in ['a','b','c','d']:
				if seat == 'a' and row == 18:
					break	
				seat_id = "%d%s" % (row, seat)
				try:
					self.browser.find_element_by_id(seat_id)
				except NoSuchElementException:
					self.fail("Couldn't find seat with id %s" % seat_id)

	def test_json(self):
		json = self.browser.execute_script('return airplane.tojson();')
		for row in range(0,18):
			for col, seat in enumerate(['a','b','c','d']):
				if seat == 'c' and row == 17:
					break
				self.assertEqual(json[row][col],'','airplane.toJSON() should return a 2d array of empty strings')


	def test_seating(self):
		
		for seat, passenger in [('1a','Ben'),('2b','Rowdy')]:
			self.browser.find_element_by_id(seat).click()
			time.sleep(2)
			alert = self.browser.switch_to_alert()
			alert.send_keys(passenger)
			alert.accept()
		json = self.browser.execute_script('return airplane.tojson();')
		print type(json)
		self.assertEqual('Ben',json[0][0],'Failure to sit Ben in seat 1a')
		self.assertEqual('Rowdy',json[1][1],'Failure to sit Rowdy in seat 2b')

if __name__ == '__main__':
	unittest.main()
