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

	model = Thread
	# paginação de 10 em 10
	paginate_by = 10
	template_name = 'forum/index.html'

		


# as_view retorna uma função
index = ForumView.as_view()



