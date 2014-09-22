require 'rubygems'
require 'json'
require 'haml'
require 'sinatra'
require "sinatra/flash"
require "debugger"
require 'data_mapper'
require 'dm-sqlite-adapter'
require 'dm-tags'
require 'securerandom'
require 'bcrypt'
require 'glorify'
require 'digest/md5'
require 'active_support/core_ext/string/inflections'
require 'active_support/core_ext/object/try'
require 'active_support/inflector'

enable :sessions
disable :protection

require "./model"
require "./routes"
require "./helpers"