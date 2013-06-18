#routes
get '/' do
  @requests = Models::Request.all
  @scopes = Models::Scope.all
  haml :index
end

before '/api/*' do
  @urn = params[:captures].first.scan(/([\w]+)(?:\/([\d]+))*/)
end

# get any arbitrary object or collection and return it as json
get %r{\/api((\/[a-zA-Z]+(\/[\d]+)?)+)} do
  find(@urn).try(:to_json) || 404
end

# create object
post %r{\/api((\/[a-zA-Z]+(\/[\d]+)?)*\/[a-zA-Z]+)} do
  create(JSON.parse(request.body.read), @urn).try(:to_json, only: :id)
end

# delete object
delete %r{\/api((\/[a-zA-Z]+(\/[\d]+)?)+)} do
  (obj = find(@urn)).nil? ? 404 : obj.destroy
end

# update object
put %r{\/api((\/[a-zA-Z]+(\/[\d]+)?)+)} do
  (obj = find(@urn)).nil? ? 404 : obj.update(JSON.parse(request.body.read)).try(:to_json, only: :id)
end

# Find a datamapper object from a urn e.g. /foos/1/bars/1, foos/2/bars, etc
def find(urn = [], obj = nil)
  res_type, res_id = urn.shift
  return false if !Models.const_defined?(res_type.classify)
  if obj.nil?
    obj = Models.const_get(res_type.classify).all
  else
    obj = obj.send(res_type)
  end
  obj = obj.get(res_id.to_i) unless res_id.nil?
  return false if obj.nil?
  urn_to_obj(urn, obj) unless urn.empty?
  obj
end

def create(params, assocs)
  obj = nil
  assocs.each do |res_type, res_id|
    return false if !Models.const_defined?(res_type.classify)
    if !res_id.nil?
      params["#{res_type.singularize}_id"] = res_id
    else
      obj = Models.const_get(res_type.classify).create(params)
    end
  end
  !obj.nil? and obj.valid? ? obj : false
end