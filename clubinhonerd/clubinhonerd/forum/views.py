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

	# Número de 'objetos' por página(a cada x objetos cria-se uma nova)
	paginate_by = 3
	template_name = 'forum/index.html'

	# Indicando a QueryString
	def get_queryset(self):
		# Indicando o model
		queryset = Thread.objects.all()
		# Pegando o que está na QueryString
		order = self.request.GET.get('order', '')
		if order == 'views':
			queryset = queryset.order_by('-views')
		elif order == 'answers':
			queryset = queryset.order_by('-answers')

		return queryset

	# '**kwargs' = argumentos que são passados na url
	# para adicionar mais coisas ao context
	def get_context_data(self, **kwargs):
		context = super(ForumView, self).get_context_data(**kwargs)
		context['tags'] = Thread.tags.all()
		return context

# as_view retorna uma função
index = ForumView.as_view()



