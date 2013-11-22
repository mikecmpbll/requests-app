helpers do
  include Rack::Utils

  JS_ESCAPE_MAP = { '\\' => '\\\\', '</' => '<\/', "\r\n" => '\n', "\n" => '\n', "\r" => '\n', '"' => '\\"', "'" => "\\'" }

  def escape_javascript(javascript)
    if javascript
      javascript.gsub(/(\\|<\/|\r\n|\342\200\250|\342\200\251|[\n\r"'])/u) {|match| JS_ESCAPE_MAP[match] }
    else
      ''
    end
  end
  def j(javascript) escape_javascript(javascript) end

  # Convert a hash to a querystring for form population
  def hash_to_query_string(hash)
    hash.delete "password"
    hash.delete "password_confirmation"
    hash.collect {|k,v| "#{k}=#{v}"}.join("&")
  end

  # Redirect to last page or root
  def redirect_last
    if session[:redirect_to]
      redirect_url = session[:redirect_to]
      session[:redirect_to] = nil
      redirect redirect_url
    else
      redirect "/"
    end  
  end

  # Loads partial view into template. Required vriables into locals
  def partial(template, locals = {})
    erb(template, :layout => false, :locals => locals)
  end

  def path_to script
    case script
      when :jquery then '//ajax.googleapis.com/ajax/libs/jquery/1.10.0/jquery.min.js'
      # when :rightjs then 'http://cdn.rightjs.org/right-2.3.0.js'
      # when :backbone then 'http://cdnjs.cloudflare.com/ajax/libs/backbone.js/0.9.0/backbone-min.js'
      # when :underscore then 'http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.3.1/underscore-min.js'
      # moo, prototype, scriptaculous, jquery ui, yui, dojo, raphael, extjs      
      else "/javascripts/libs/#{script}.js"
    end
    # "/javascripts/libs/#{script}.js"
  end

  def javascripts(*args)
    js = []
    js << settings.javascripts if settings.respond_to?('javascripts')
    js << args
    js << @js if @js
    js.flatten.uniq.map do |script| 
      "<script src=\"#{path_to script}\"></script>"
    end.join
  end

  def js(*args)
    @js ||= []
    @js = args
  end

end
