from django.core import mail
from django.test import TestCase
from django.test.client import Client
from django.urls import reverse
from django.conf import settings

from clubinhonerd.courses.models import Course

class ContactCourseTestCase(TestCase):

	# feito antes de rodar os testes
	def setUp(self):
		self.course = Course.objects.create(name='Django', slug='django')

	# feito ao final de rodar os testes
	def tearDown(self):
		self.course.delete()	

	def test_contact_form_error(self):
		data = {'name':'Fulano de Tal', 'email':'', 'message':''}
		client = Client()		
		path = reverse('courses:details', args=[self.course.slug])
		response = client.post(path, data)
		# Verificar erro no campo email
		self.assertFormError(response, 'form', 'email', 'Este campo é obrigatório.')
		# Verificar erro no campo message
		self.assertFormError(response, 'form', 'message', 'Este campo é obrigatório.')

	def test_contact_form_success(self):
		data = {'name':'Fulano de Tal', 'email':'admin@admin.com', 'message':'Testando'}
		client = Client()		
		path = reverse('courses:details', args=[self.course.slug])
		response = client.post(path, data)
		# Verificando se um email foi enviado
		self.assertEqual(len(mail.outbox), 1)
		self.assertEqual(mail.outbox[0].to, [settings.CONTACT_EMAIL])


	# @classmethod
	# def setUpClass(cls):
	# 	pass

	# @classmethod
	# def tearDownClass(cls):
	# 	pass