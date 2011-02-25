require 'rubygems'
require 'sinatra'

#
# Globetacularly Persistant Variables
#

$x = 640  # Initial planchette position
$y = 360  #
$ox = 100 # Offsets so center of plancette's "window" can be calculated
$oy = 122 #
$w = 1280 # Size of the game board
$h = 720  # 

#
# Routes
#

get '/' do
	erb :server
end

# Opens not-quite appropriately sized popup window
get '/popup' do
	erb :popup
end

# Current X position for planchette
get '/x' do
	($x-$ox).to_s
end

# Current X position for planchette
get '/y' do
	($y-$oy).to_s
end

get '/input' do
	$x += params[:x].to_i
	$y -= params[:y].to_i
 
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