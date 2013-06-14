module Models
  DataMapper.setup(:default, ENV['DATABASE_URL'] || "sqlite3://#{Dir.pwd}/development.db")

  class Request
    include DataMapper::Resource
    property :id,             Serial
    property :summary,        String, required: true
    property :detail,         Text
    property :created_at,     DateTime
    property :completed_at,   DateTime
    belongs_to :scope
    has_tags

    def scope_id=(scope_id)
      scope_id = scope_id.to_i
      super
    end
  end

  class Scope
    include DataMapper::Resource
    property :id,           Serial
    property :name,         String, required: true
    property :created_at,   DateTime
    has n, :requests, :constraint => :destroy
  end

  DataMapper.finalize
  DataMapper.auto_upgrade!
end