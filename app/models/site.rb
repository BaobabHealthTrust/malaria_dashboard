class Site < CouchRest::Model::Base

	use_database 'sites'

	property :name, String
	property :site_code, String
	property :district, String
	property :ip_address, String


	design do
		view :by_name,
		     :map => "function(doc) {
                     emit(doc['name']);
                }"

	end

	def self.add_site(name,site_code,district,ip_address)
		site = Site.new({:name => name, :site_code => site_code, :district => district, :ip_address => ip_address})
		if site.save
			return ["Site successfully saved", true]
		else
			return ["Site could not be added", nil]
		end
	end

end