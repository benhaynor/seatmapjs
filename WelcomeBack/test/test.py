from splinter import Browser

HOST='http://localhost:8080'


def test_clicking():
    browser = Browser()
    browser.
    browser.switch_to_alert().accept()
    browser.visit('%s/seatmap' % HOST)
    browser.find_by_id('1a').click()
    if browser.is_text_present('What is your name?'):
        print "Clicking works."
    else:
        print "Clicking doesn't work."
    browser.quit()

if __name__ == '__main__':
    test_clicking()
