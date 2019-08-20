export default {
  bacteria: (
    <>
      <p>This is kind of a big one and why we put it first. Bacteria, specifically “Enterococcus,” is the main factor that impacts whether or not it’s safe to swim in the water. The NYC Department of Health says its safe to swim when levels are under 35 Colony Forming Units (CFU). The problem is, current systems for testing the concentration of bacteria generally takes a 24 hours lab test. That's why we have developed a predictive algorithm with our friends at Columbia University based off highly correlated environmental parameters, such as precipitation, in order to present in real-time the probable concentration of Enterococci. Like the standard 24 hour lab measurement, this value is reported in Most Probable Number, or MPN.</p>
      <h4>Why We Care</h4>
      <p>Before bacteria became a major issue affecting our water quality, New Yorkers used to swim in the river all the time!  By the year 1890, there were 15 floating bathhouses that gave New Yorkers access points to swim in the river. In 1911, of the 4.8 million people that lived in NYC, 1.8 million used the floating baths - that's 40%!</p>
      <h4>Your Impact</h4>
      <p>How do our actions affect bacteria in the water?</p>
      <ul>
        <li>excessive water use during rain storms that over load the sewer systems, resulting in sewage overflows right in the river :(</li>
      </ul>
    </>
  ),
  oxygen: (
    <>
      <p>Just like the air we breath on land, oxygen supports life in the water. This parameter gets its clever name, Dissolved Oxygen, because oxygen makes its way into the water from the air, or its produced by underwater plants and dissolves in water. Levels tend to be highest during daylight (when plants and animals use it to breath) and drop during the night (when there’s no photosynthesis to counteract consumption).</p>
      <h4>Why We Care</h4>
      <p>We track turbidity to to see how much funk is in the water. Funk can take the form of floating particles like clay, silt, algae, or sewage. This might be obvious, but generally, clear water is healthier than murky or opaque water. More floating particles = greater turbidity.</p>
      <p>Turbidity is a pretty unique water quality parameter in that its visible - you can see with your eyes if water has high turbidity or low turbidity, unlike other parameters, such as oxygen. But we still measure it in what's called NTU, which stands for Nephelometric Turbidity Units, simply because the instrument used for measuring it is called a nephelometer. This instrument traces the amount of light that can penetrate through the water. More light means turbidity is low. And less light? More funk!</p>
      <h4>Your Impact</h4>
      <p>What contributes to low levels of dissolved oxygen?</p>
      <ul>
        <li>street runnoff from salting roads</li>
        <li>increased water temperature from asphalt runoff</li>
        <li>incresed temperature from lack of tree cover; execessive errosion</li>
      </ul>
    </>
  ),
  temperature: (
    <p>When you're hot you're hot, and look at what you got. Also under 60F puts most people at risk of hypothermia.</p>
  ),
  salinity: (
    <>
      <p>Some water has salt, some water is fresh. In the East River, its a little bit of both!  Salinity changes often in NYC because the river is actually an estuary, where salt water (coming in from the ocean) and fresh water (coming down from Upstate) mix together. Thats why when the water is flowing north there tends to be a higher level of salinity and when the water is flowing south, salinity tends to be lower.</p>
      <h4>Why We Care</h4>
      <p>Somewhere south of the Tappan Zee Bridge, is the border of diluted seawater (called a "salt front,') but it can reach as far north as Poughkeepsie during droughts. If you tested the water for salt, you probably wouldn't find any past Newburgh, NY.</p>
      <h4>Your Impact</h4>
      <p>How do we affect salinity?</p>
      <ul>
        <li>runoff from salting the streats in the winter months</li>
      </ul>
    </>
  ),
  turbidity: (
    <>
      <p>We track turbidity to to see how much funk is in the water. Funk can take the form of floating particles like clay, silt, algae, or sewage. This might be obvious, but generally, clear water is healthier than murky or opaque water. More floating particles equals greater turbidity.</p>
      <p>Turbidity is a pretty unique water quality parameter in that its a visible - you can see with your eyes if water has high turbidity or low turbidity, unlike other parameters, such as oxygen. But we still measure it in what's called NTU, which stands for Nephelometric Turbidity Units simply because the instrument used for measuring it is called a nephelometer. This instrument traces the amount of light that can penetrate through the water. More light means turbidity is low. And less light? More funk.</p>
      <h4>Why We Care</h4>
      <p>High turbidity blocks the sunlight in the water which plants need to create more oxygen and aquatic life needs to breath. High turbidity is also tough on fish since all the funk can affect their vision and since of smell. </p>
      <h4>Your Impact</h4>
      <p>What causes high turbidity?</p>
      <ul>
        <li>erosion from farms, mining, construction sites, or tree removal near water bodies</li>
        <li>urban runoff; boats that stir up sediment</li>
        <li>nutrients from farms that feed algae blooms</li>
      </ul>
    </>
  ),
  speed: (
    <p>Speed effects how fast (or how slow!) an area of water changes. Not related to the Keanue Reeves film(s). ;)</p>
  ),
  direction: (
    <>
      <p>Due to the tides coming in and going out from the ocean, the East River runs north for six hours and then runs south for six hours. Pretty cool.</p>
      <h4>Why We Care</h4>
      <p>New York Natives Tribes who hung by the river like the Lenape called the East River the Mahicantuck, which translates to “the river that flows both ways.”</p>
      <h4>Your Impact</h4>
      <p>Can I impact drection of the water? Probably not! But climate change does effect the tides and there are a lot things we do that impact the warming of our climate.</p>
    </>
  ),
  ph: (
    <>
      <p>pH tells us whether water is acidic or basic. For good water quality, we don't want pH to be too high or too low. pH is effected by all kinds of things, including rain and snow, which tend to be acidic. Wetlands and marshes tend to help keep pH balanced.</p>
      <h4>Why We Care</h4>
      <p>A pH below 4 or above 10 will kill most fish and very few animals can tolerate waters with a pH below 3 or above 11, including us!</p>
      <h4>Your Impact</h4>
      <p>What causes pH to fluctuate?</p>
      <ul>
        <li>mining that creates acidic runoff; factory runoff</li>
        <li>pollution</li>
        <li>domestic or industrial runoff of soaps and detergents</li>
      </ul>
    </>
  ),
  depth: (
    <p>The distance from the top of the water to the bottom of the riverbed. You might think this wouldn't change but because the Hudson River is a tidal esuary, its changing all the time with the tides.</p>
  )
}