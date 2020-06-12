import { Selector } from 'testcafe'
import { beforeEachTest, getURL } from '../helpers'

fixture `Search`
  .page `http://localhost:8080/`
  .beforeEach(beforeEachTest)
  .afterEach(async t => {
    await t
      .navigateTo('http://localhost:8080')
      .wait(1000)
  })

test('Search for term', async t => {
  const listCount = await Selector('.location-list--item').count
  console.log('listCount', listCount)

  // This will have to change if we switch to drawing the map with canvas
  await t
    // Markers on the map should equal the listCount
    .expect(Selector('.mapboxgl-marker').filterVisible().count).eql(listCount)
    // Type "test" into the search input
    .typeText(Selector('#search'), 'test')
    // Wait 500ms
    .wait(500)
    // New results should not equal the original count
    .expect(Selector('.location-list--item').count).notEql(listCount)
    .expect(Selector('.mapboxgl-marker').filterVisible().count).notEql(listCount)
    // URL should include search parameters
    .expect(getURL()).contains('?search=test')
})

test('Clear Search', async t => {
  const listCount = await Selector('.location-list--item').count
  console.log('listCount', listCount)

  // This will have to change if we switch to drawing the map with canvas
  await t
    // Type "test" into the search input
    .click(Selector('#search'))
    .typeText(Selector('#search'), 'test')
    // Wait 1000ms
    .wait(1000)
    // New results should not equal the original count
    .expect(Selector('.location-list--item').count).notEql(listCount)
    // Click on the "Clear Search" button
    .click(Selector('#clear-search-btn'))
    // Wait 1000ms
    .wait(1000)
    // List count should equals the original listCount
    .expect(Selector('.location-list--item').count).eql(listCount)
})

test('Navigate to page with search parameter', async t => {
  const listCount = await Selector('.location-list--item').count
  console.log('listCount', listCount)
  const url = await getURL()
  console.log('url', url)

  // This will have to change if we switch to drawing the map with canvas
  await t
    // Go to url with search parameter
    .navigateTo(`${url}?search=test`)
    // Wait 1000ms
    .wait(1000)
    // Search box value should be "test"
    .expect(Selector('#search').value).eql('test')
    // New results should not equal the original count
    .expect(Selector('.location-list--item').count).notEql(listCount)
})
