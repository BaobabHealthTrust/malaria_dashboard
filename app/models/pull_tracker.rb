class PullTracker < CouchRest::Model::Base

	use_database "pulltracker"


	property :site_id, String
	property :status, String
	property :date, String
	property :data, String

	design do
		view :by_status,
		     :map => "function(doc) {
						emit(doc['status']);
                }"

	end

	def self.add_site(site_id,status,date,data)
		site = PullTracker.new({:site_id => site_id, :status => status, :date => date, :data => data})
		if site.save
			return ["Site successfully saved", true]
		else
			return ["Site could not be added", nil]
		end
	end
end
