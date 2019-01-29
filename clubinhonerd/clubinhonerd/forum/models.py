from django.db import models
from taggit.managers import TaggableManager
from django.conf import settings
from django.urls import reverse

from clubinhonerd.core.models import BaseModel

# Um tópico do fórum
class Thread(models.Model):

	title = models.CharField('Título', max_length=100)
	slug = models.SlugField('Identificador', max_length=100, unique=True)
	body = models.TextField('Mensagem')
	author = models.ForeignKey(settings.AUTH_USER_MODEL,
		verbose_name='Autor', related_name='threads', on_delete=models.PROTECT
	)
	views = models.IntegerField('Visualizações', blank=True, default=0)	
	answers = models.IntegerField('Respostas', blank=True, default=0)
	tags = TaggableManager()

	created = models.DateTimeField('Criado em', auto_now_add=True)
	modified = models.DateTimeField('Atualizado em', auto_now=True)
	
	def __str__(self):
		return self.title

	def get_absolute_url(self):	
		return reverse('forum:thread', kwargs={ 'slug': self.slug })	
 

	class Meta():
		verbose_name = 'Tópico'
		verbose_name_plural = 'Tópicos'
		ordering = ['-modified']


class Reply(models.Model):

	thread = models.ForeignKey(Thread,
		verbose_name='Tópico', related_name='replies', on_delete=models.PROTECT
	)
	reply = models.TextField('Resposta')
	author = models.ForeignKey(settings.AUTH_USER_MODEL,
		verbose_name='Autor', related_name='replies', on_delete=models.PROTECT
	)

	correct = models.BooleanField('Correta?', blank=True, default=False)
	created = models.DateTimeField('Criado em', auto_now_add=True)
	modified = models.DateTimeField('Atualizado em', auto_now=True)
	
	def __str__(self):
		# voltar apenas os 100 primeiros caracteres
		return self.reply[:100]

	class Meta():
		verbose_name = 'Resposta'
		verbose_name_plural = 'Respostas'
		# O 'true' é considerado maior que o 'false', por isso o '-'
		ordering = ['-correct', '-created']

"""
O 'update' não dispara os gatilhos pré e post_save
Para contar as respostas de uma Thread
"""
def post_save_reply(created, instance, **kwargs):
	instance.thread.answers = instance.thread.replies.count()
	instance.thread.save()
	# Indicando se uma resposta é a correta
	if instance.correct:
		# Colocando todas as respostas para False exclude=menos a resposta em questão
		instance.thread.replies.exclude(pk=instance.pk).update(correct=False)

def post_delete_reply(instance, **kwargs):
	instance.thread.answers = instance.thread.replies.count()
	instance.thread.save()


# Apenas o model Reply dispara esse sinal
models.signals.post_save.connect(
	post_save_reply, sender=Reply, dispatch_uid='post_save_reply'
)
# Apenas o model Reply dispara esse sinal
models.signals.post_delete.connect(
	post_delete_reply, sender=Reply, dispatch_uid='post_delete_reply'
)