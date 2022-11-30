from flask import Blueprint, request
from ..forms.search_form import SearchForm
from ..models import Business

search_routes = Blueprint('search', __name__)

@search_routes.route('/', methods=['GET', 'POST'])
def search_business():
    searchForm = SearchForm()
    # print('here in backend !!!! FIND ME')
    searchForm['csrf_token'].data = request.cookies['csrf_token']
    if searchForm.validate_on_submit():
        data = searchForm.data['search']
        searchResult = Business.query.filter(Business.name.ilike(f'%{data}%')).all()
        # print('the data in backend-----', data)
        # print('the result --------', searchResult)
        if searchResult:
            # print('business: -----', [business.to_dict_relationship() for business in searchResult])
            return {'business': [business.to_dict_relationship() for business in searchResult]}
        else:
            return {'business': {}}
    return searchForm.errors
