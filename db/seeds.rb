# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
   Site.delete_all
   Site.create([
                  { name: 'Mchinji District Hospital',
                    site_code: 'MC DHO',
                    district: 'Mchinji',
                    ip_address: 'http://localhost:9000'},
                  { name: 'Dedza District Hospital',
                    site_code: 'DZ DHO',
                    district: 'Dedza',
                    ip_address: 'http://localhost:9000' },
                  { name: 'Nkhotakota District Hospital',
                    site_code: 'KK DHO',
                    district: 'Nkhotakota',
                    ip_address: 'http://localhost:9000' },
                  { name: 'Malomo Health Center',
                    site_code: 'ML',
                    district: 'Ntchisi',
                    ip_address: 'http://localhost:9000' },
                  { name: 'Kamuzu Central Hospital ',
                    site_code: 'KCH',
                    district: 'Lilongwe',
                    ip_address: 'http://localhost:9000' }
               ])
   
