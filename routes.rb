#routes
get '/' do
  @requests = Models::Request.all
  @scopes = Models::Scope.all
  haml :index
end

# get any arbitrary object or collection and return it as json
get %r{\/api((\/[a-zA-Z]+(\/[\d]+)?)+)} do
  urn = params[:captures].first.scan(/([\w]+)(?:\/([\d]+))*/)
  find(urn).try(:to_json) || 404
end

# create object
post %r{\/api((\/[a-zA-Z]+(\/[\d]+)?)*\/[a-zA-Z]+)} do
  assocs = params[:captures].first.scan(/([\w]+)(?:\/([\d]+))*/)
  post_data = JSON.parse(request.body.read)
  (res = create(post_data, assocs)).try(:to_json, only: :id)
end

# delete object
delete %r{\/api((\/[a-zA-Z]+(\/[\d]+)?)+)} do
  urn = params[:captures].first.scan(/([\w]+)(?:\/([\d]+))*/)
  (obj = find(urn)).nil? ? 404 : obj.destroy
end

# put %r{...}