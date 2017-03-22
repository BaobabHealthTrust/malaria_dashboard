class PullTracker < CouchRest::Model::Base

  property :district_code, String
	property :site_code, String
  property :site_name, String
  property :district_name, String
  property :date, String
	property :data, String

	design do
		view :by_date,
		     :map => "function(doc) {
                  if(doc['type'] == 'PullTracker'){
                    emit(doc['date']);
                  }
                }"
    view :by_site_code_and_date,
         :map => "function(doc) {
                  if(doc['type'] == 'PullTracker'){
                    emit(doc['site_code'] + '__' + doc['date']);
                  }
                }"
	end

end
