require 'rubygems'
require 'sinatra'
require 'json'

set :server, 'thin'

#
# Globetacularly Persistant Variables
#
$x = 960  # Initial planchette position
$y = 540  #
$ox = 100 # Offsets so center of plancette's "window" can be calculated
$oy = 122 #
$w = 1920 # Size of the game board
$h = 1080 #
$popup_w = 1280 # Size of the game board
$popup_h = 720 #

$SCALE = 10

#
# Routes
#
get('/') { erb :server }

# HTML5 Device Orientation client
get('/client') { erb :client }

# Opens not-quite appropriately sized popup window
get('/popup') { erb :popup }

# Current X position for planchette
get '/x' do
	($x-$ox).to_s
end

# Current X position for planchette
get '/y' do
	($y-$oy).to_s
end

# Current position of planchette
get '/pos' do
	content_type :json
	{ :x => ($x - $ox).to_s, :y => ($y - $oy).to_s }.to_json
end

get '/input' do
	$x += params[:x].to_i / $SCALE
	$y -= params[:y].to_i / $SCALE
 
	if($x > $w)
		$x = $w
	end
	if($x < 0)
		$x = 0
	end
	if($y > $h)
		$y = $h
	end
	if($y < 0)
		$y = 0
	end

	"x: #{$x}<br/>y: #{$y}"
end

get '/setpos' do
	$x = params[:x].to_i
	$y = params[:y].to_i
 
	"x: #{$x}<br/>y: #{$y}"
end
