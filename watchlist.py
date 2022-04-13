from bs4 import BeautifulSoup
import requests

def addProduct(link):

    source0 = requests.get(link, headers={'User-agent': 'Chrome'}, timeout=(2, 5))

    source = source0.text

    data = BeautifulSoup(source, 'lxml')

    if 'amazon.in' in link:

        title0 = data.find(
            'span', class_='a-size-large product-title-word-break').text

        title = title0.replace(' ','')

        try:

            price0 = data.find(
                'span', class_='a-offscreen').text

            price = int(price0[1:].replace(',', '').replace('.', '')) / 100

        except:
            price=None

        try:

            availability0 = data.find(
                'span', class_='a-size-medium a-color-success').text

            availability = availability0.replace(' ','')

        except:
            try:
                availability0 = data.find(
                    'span', class_='a-size-medium a-color-state').text

                availability = availability0.replace(' ','')
            except:
                availability0 = data.find(
                'span', class_='a-size-medium a-color-price').text
                availability = availability0.replace(' ','')
        try:
            prodImg = data.find('img',class_='a-dynamic-image a-stretch-horizontal')
            imgLink = prodImg['src']
        except:
            prodImg = data.find('img',class_='a-dynamic-image a-stretch-vertical')
            imgLink = prodImg['src']

    if 'flipkart.com' in link:

        price0 = data.find('div', class_='_30jeq3 _16Jk6d').text

        price = int(price0[1:].replace(',', ''))

        title0 = data.find('span', class_='B_NuCI').text

        title = title0.replace('\xa0', '')
        try:
            availability0 = data.find(
                'div', class_='_16FRp0').text
            availability = availability0.replace(' ','')
        except:
            availability = 'In stock.'

        prodImg = list(data.find('div',class_='_3kidJX'))
        prodImg = list(prodImg[1])[0]
        imgLink = prodImg['src']

    info = {'title':title,'price':price,'availability':availability,'image':imgLink}

    return info


def getPrice(link):

    source0 = requests.get(link, headers={'User-agent': 'Chrome'}, timeout=(2, 5))

    source = source0.text

    data = BeautifulSoup(source, 'lxml')

    if 'amazon.in' in link:

        try:

            price0 = data.find(
                'span', class_='a-offscreen').text

            price = int(price0[1:].replace(',', '').replace('.', '')) / 100

        except:
            price=None

        try:

            availability0 = data.find(
                'span', class_='a-size-medium a-color-success').text

            availability = availability0.replace(' ','')

        except:
            try:
                availability0 = data.find(
                    'span', class_='a-size-medium a-color-state').text

                availability = availability0.replace(' ','')
            except:
                availability0 = data.find(
                'span', class_='a-size-medium a-color-price').text
                availability = availability0.replace(' ','')

    if 'flipkart.com' in link:

        price0 = data.find('div', class_='_30jeq3 _16Jk6d').text

        price = int(price0[1:].replace(',', ''))

        try:
            availability0 = data.find(
                'div', class_='_16FRp0').text
            availability = availability0.replace(' ','')
        except:
            availability = 'Instock.'

    info = (price,availability)

    return info
