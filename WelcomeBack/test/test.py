from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException
import unittest
import time


class AirplaneTester(unittest.TestCase):
	
	HOST='http://localhost:8080'

	@classmethod
	def setUpClass(self):
		self.browser = webdriver.Firefox()
	
	def setUp(self):
		self.browser.get(self.HOST) 
	
	@classmethod
	def tearDownClass(self):
		self.browser.close()
	
	def tst_ids(self):
		for airplane_type in ('Out','Return'):
			for row in range(1,19):
				for seat in ('a','b','c','d'):
					if seat == 'a' and row == 18:
						break	
					seat_id = "%d%s%s" % (row, seat, airplane_type)
					try:
						self.browser.find_element_by_id(seat_id)
					except NoSuchElementException:
						self.fail("Couldn't find seat with id %s" % seat_id)

	def tst_json(self):
		for airplane_type in ('Out','Return'):
			json = self.browser.execute_script('return airplane%s.tojson();' % airplane_type)
    		for row in range(0,18):
    			for col, seat in enumerate(('a','b','c','d')):
    				if seat == 'c' and row == 17:
    					break
    				self.assertEqual(json[row][col],'','airplane.tojson() should return a 2d array of empty strings')

	def put_passenger_in_seat(self, passenger, seatid):
		self.browser.find_element_by_id(seatid).click()
		time.sleep(2)
		alert = self.browser.switch_to_alert()
		alert.send_keys(passenger)
		alert.accept()

	def tst_seating(self):
		for airplane_type in ('Out','Return'):	
			for seat, passenger in (('1a','Ben'),('2b','Rowdy')):
				self.put_passenger_in_seat(passenger,'%s%s' % (seat,airplane_type))
			json = self.browser.execute_script('return airplane%s.tojson();' % airplane_type)
			self.assertEqual('Ben',json[0][0],'Failure to sit Ben in seat 1a')
			self.assertEqual('Rowdy',json[1][1],'Failure to sit Rowdy in seat 2b')

	def test_no_fly_list_with_terrorist(self):
		'''When a user enters Osama Bin Laden into a seat, they should be redirected to a page
		containing "Alert the authorities!"
		'''
		self.put_passenger_in_seat('Osama Bin Laden','1aOut')	
		self.browser.find_element_by_id('reserveSeatsButton').click()
		time.sleep(10)
		alert = self.browser.switch_to_alert()
		self.assertIn('Alert the authorities!', alert.text)
		alert.dismiss()

	def test_no_fly_list_with_no_terrorist(self):
		self.put_passenger_in_seat('Harmless Ben','1aOut')	
		self.browser.find_element_by_id('reserveSeatsButton').click()
		time.sleep(10)
		alert = self.browser.switch_to_alert()
		self.assertIn('Enjoy your flight!', alert.text)
		alert.dismiss()	

if __name__ == '__main__':
	unittest.main()
