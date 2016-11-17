namespace :db do
	task create: :environment do
		db_user_name = `ruby -ryaml -e "puts YAML::load_file('config/couchdb.yml')['development']['username']"`.squish
		db_password = `ruby -ryaml -e "puts YAML::load_file('config/couchdb.yml')['development']['password']"`.squish
		prefix = `ruby -ryaml -e "puts YAML::load_file('config/couchdb.yml')['development']['prefix']"`.squish
		suffix = `ruby -ryaml -e "puts YAML::load_file('config/couchdb.yml')['development']['suffix']"`.squish
		db_name = "#{prefix}_#{suffix}"

		system "curl -X PUT http://#{db_user_name}:#{db_password}@localhost:5984/#{db_name}"
	end

	task migrate: :environment do

	end

	task seed: :environment do
		db_user_name = `ruby -ryaml -e "puts YAML::load_file('config/couchdb.yml')['development']['username']"`.squish
		db_password = `ruby -ryaml -e "puts YAML::load_file('config/couchdb.yml')['development']['password']"`.squish
		prefix = `ruby -ryaml -e "puts YAML::load_file('config/couchdb.yml')['development']['prefix']"`.squish
		suffix = `ruby -ryaml -e "puts YAML::load_file('config/couchdb.yml')['development']['suffix']"`.squish
		db_name = "#{prefix}_#{suffix}"

		url = "http://#{db_user_name}:#{db_password}@localhost:5984/#{db_name}"

		sites = [{
						name: 'Mchinji District Hospital',
						site_code: 'MC DHO',
						district: 'Mchinji',
						ip_address: 'http://localhost:9000'
				 },
		          {
				         name: 'Dedza District Hospital',
				         site_code: 'DZ DHO',
				         district: 'Dedza',
				         ip_address: 'http://localhost:9000'
		         },
		         {
				         name: 'Nkhotakota District Hospital',
				         site_code: 'KK DHO',
				         district: 'Nkhotakota',
				         ip_address: 'http://localhost:9000'
		         },
		         {
				         name: 'Malomo Health Center',
				         site_code: 'ML',
				         district: 'Ntchisi',
				         ip_address: 'http://localhost:9000'
		         },
		         {
				         name: 'Kamuzu Central Hospital ',
				         site_code: 'KCH',
				         district: 'Lilongwe',
				         ip_address: 'http://localhost:9000'
		         }
				]

		sites.each do |site|
			name =  site[:name]
			site_code =  site[:site_code]
			district =  site[:district]
			ip_address =  site[:ip_address]

			system "curl -H \"Content-type:application/json\" -d '{\"name\": \"#{name}\",\"site_code\": \"#{site_code}\",\"district\": \"#{district}\",\"ip_address\": \"#{ip_address}\"}' -X POST #{url} "
		end
	end
end