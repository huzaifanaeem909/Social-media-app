from django.urls import path
from .views import PostListView, PostCreateView, PostRetrieveView, PostUpdateView, PostDeleteView

urlpatterns = [
    path('list/', PostListView.as_view(), name='post-list'),
    path('create/', PostCreateView.as_view(), name='post-create'),
    path('<int:pk>/view/', PostRetrieveView.as_view(), name='post-retrieve'),
    path('<int:pk>/update/', PostUpdateView.as_view(), name='post-update'),
    path('<int:pk>/delete/', PostDeleteView.as_view(), name='post-delete'),
]
