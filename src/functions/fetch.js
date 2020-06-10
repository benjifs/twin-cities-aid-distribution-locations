const got = require('got')

const URL = 'https://spreadsheets.google.com/feeds/list/1jJrcnk3n2FL5b5bwI-h-74SErSHKak9p-YbAf73VtiY/od6/public/values?alt=json'

const extractRawLocation = (item) => {
  return {
    name: item.gsx$nameoforganization.$t,
    neighborhood: item.gsx$neighborhood.$t,
    address: item.gsx$addresswithlink.$t,
    mostRecentlyUpdatedAt: item.gsx$mostrecentlyupdated.$t,
    // seekingMoney: extractSeekingMoney(item),
    // seekingMoneyURL: extractSeekingMoneyURL(item),
    currentlyOpenForDistributing: item.gsx$currentlyopenfordistributing.$t,
    // aidDistributionHours: getHours(item.gsx$openingfordistributingdonations.$t, item.gsx$closingfordistributingdonations.$t),
    accepting: item.gsx$accepting.$t,
    notAccepting: item.gsx$notaccepting.$t,
    currentlyOpenForReceiving: item.gsx$currentlyopenforreceiving.$t,
    // aidReceivingHours: getHours(item.gsx$openingforreceivingdonations.$t, item.gsx$closingforreceivingdonations.$t),
    seekingVolunteers: item.gsx$seekingvolunteers.$t,
    urgentNeed: item.gsx$urgentneed.$t,
    notes: item.gsx$notes.$t
  }
}

exports.handler = async () => {
	try {
		const res = await got.get(URL, {
			responseType: 'json'
		})
		if (res.statusCode == 200) {
			const entries = res.body.feed.entry
			let out = entries.map(item => extractRawLocation(item))
			return {
				statusCode: 200,
				body: JSON.stringify(out)
			}
		}
	} catch (err) {
		console.error(err)
	}
	return { statusCode: 500 }
}
