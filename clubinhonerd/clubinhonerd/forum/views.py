from django.shortcuts import render
from django.views.generic import TemplateView, ListView

from .models import Thread

# Usando a View
# class ForumView(View):

# 	# template_name = 'forum/index.html'
# 	def get(self, request, *args, **kwargs):
# 		return render(request, 'forum/index.html')


# Usando uma GenericView
# class ForumView(TemplateView):

# 	template_name = 'forum/index.html'


# index = TemplateView.as_view(template_name='forum/index.html')

class ForumView(ListView):

	# Podemos idicar tanto o 'model' = model = Thread
	# Como também podemos indicar a 'queryset' = função abaixo
	# Número de 'objetos' por página(a cada x objetos cria-se uma nova)
	paginate_by = 5
	template_name = 'forum/index.html'

	# Indicando a QueryString/QuerySet
	def get_queryset(self):
		# Indicando o model
		queryset = Thread.objects.all()
		# Pegando o que está na QueryString
		order = self.request.GET.get('order', None) # None ou ''
		if order == 'views':
			queryset = queryset.order_by('-views')
		elif order == 'answers':
			queryset = queryset.order_by('-answers')
		# Acessando um atributo nomeado da url
		tag = self.kwargs.get('tag', None) # None ou ''
		if tag:
			queryset = queryset.filter(tags__slug__icontains=tag)

		return queryset

	# '**kwargs' = argumentos que são passados na url (nomeados)
	# '*args' = argumentos que são passados na url (não nomeados)
	# Para atualizar/adicionar o context
	def get_context_data(self, **kwargs):
		context = super(ForumView, self).get_context_data(**kwargs)
		context['tags'] = Thread.tags.all()
		return context

# as_view retorna uma função
index = ForumView.as_view()



