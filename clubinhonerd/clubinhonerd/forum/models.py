from django.db import models
from taggit.managers import TaggableManager
from django.conf import settings

from clubinhonerd.core.models import BaseModel

# Um tópico do fórum
class Thread(BaseModel):

	title = models.CharField('Título', max_length=100)
	body = models.TextField('Mensagem')
	author = models.ForeignKey(settings.AUTH_USER_MODEL,
		verbose_name='Autor', related_name='threads', on_delete=models.PROTECT
	)
	views = models.IntegerField('Visualizações', blank=True, default=0)	
	answers = models.IntegerField('Respostas', blank=True, default=0)
	tags = TaggableManager()

	# created = models.DateTimeField('Criado em', auto_now_add=True)
	# modified = models.DateTimeField('Atualizado em', auto_now=True)
	
	def __str__(self):
		return self.title

	class Meta():
		verbose_name = 'Tópico'
		verbose_name_plural = 'Tópicos'
		ordering = ['-modified']


class Reply(BaseModel):

	reply = models.TextField('Resposta')
	author = models.ForeignKey(settings.AUTH_USER_MODEL,
		verbose_name='Autor', related_name='replies', on_delete=models.PROTECT
	)

	correct = models.BooleanField('Correta?', blank=True, default=False)
	# created = models.DateTimeField('Criado em', auto_now_add=True)
	# modified = models.DateTimeField('Atualizado em', auto_now=True)
	
	def __str__(self):
		# voltar apenas os 100 primeiros caracteres
		return self.reply[:100]

	class Meta():
		verbose_name = 'Resposta'
		verbose_name_plural = 'Respostas'
		# O 'true' é considerado maior que o 'false', por isso o '-'
		ordering = ['-correct', '-created']