require 'rails_helper'


RSpec.describe "pages/index.haml", :type => :view do
	describe 'search' do
	  it "should have a search selector" do
	  	have_selector("#search_flickr")

	  end
	end
end
