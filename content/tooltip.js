export default {
  bacteria: (
    <>
      <p>Pathogens can take the form of bacteria, viruses, or other microorganisms that can cause disease and that’s why we put it at the top of our list! Because there are so many potential pathogens it’s difficult and expensive to test for them directly, the EPA recommends we track “indicator organisms” that tell us where disease causing microbes <em>may</em> be present. That’s why we test for “Enterococcus,” a bacterium that is not generally harmful to humans (it’s in all of our guts!) but widely considered the best ‘indicator’ for pathogens. The NYC Department of Health says it’s safe to swim when levels are under 35 Colony Forming Units (CFU).</p>
      <p>The problem is, current systems for testing the concentration of bacteria generally takes 24 hours in a lab. That's why we have developed a predictive algorithm with our friends at Columbia University based off highly correlated environmental parameters in order to present in real-time the probable concentration of Enterococci. We also use the latest-generation rapid microbiology techniques, thanks to <a href="http://fluidion.com/en/products/alert-system-2">Fluidion's ALERT technology</a>, in order to assess daily actual bacterial levels and compare with model predictions.</p>
    </>
  ),
  oxygen: (
    <>
      <p>Just like the air we breathe on land, oxygen supports life in the water. This parameter gets its clever name, Dissolved Oxygen, because oxygen makes its way into the water from the air, or its produced by underwater plants and dissolves in water. Levels tend to be highest during daylight (when plants and animals use it to breathe) and drop during the night (when there’s no photosynthesis to counteract consumption).</p>
      <p>Low Oxygen won’t bother human swimmers since we can’t breathe in the water (unless you’re Michael Phelps!), but it is very hard marine life and starts to starve breathing things.  Even still, bacteria can still thrive, which is why it’s important to track for swimming.  Bodies of water with higher levels of dissolved oxygen can support many different kinds of aquatic organisms. Bottom feeders, crabs, oysters and worms need minimal amounts of oxygen, while shallow water fish need higher levels. Oxygen likes to be in cold fresh water and enters the water when there is lots of mixing.</p>
    </>
  ),
  temperature: (
    <>
      <p>When you're hot you're hot, and look at what you got!  Temperature is the degree or intensity of heat present in the water but you probably already know that from Al Roker.  Water temperature fluctuates by season just like air temperature but tends to be a little cooler than the air in the summer -- which is why we enjoy swimming in it so much on a hot day!  Of course everyone has a different preference when it comes to water temperature. What’s yours? Chilly? Cool? Warm?</p>
      <p>It is considered very very cold below 46 degrees and even the most fearless among us would be foolish to risk hypothermia for a swim! In the winter month, average water temperature can be around 39 degrees (brrrrrr!) but in the height of summer the water inch up to 80! Temperature affects the experience we have swimming, but it can also have a major impact on marine life.</p>
    </>
  ),
  salinity: (
    <>
      <p>Some water is salty, some water is fresh. In the East River, it’s a little bit of both! Salinity changes often in NYC because the harbor is part of an estuary, where salt water (coming in from the ocean) and freshwater (coming down from Upstate) mix together. High salinity means there is tons of ocean water (and ocean creatures!) at the site.</p>
      <p>As you head north up the Hudson towards fresher water, salinity tends to drop and though it fluctuates, somewhere around the Tappan Zee Bridge, is the border of diluted seawater (called a “salt front”) but it can reach as far north as Poughkeepsie during droughts. If you tested the water for salt, you probably wouldn't find any past Beacon, NY.</p>
    </>
  ),
  turbidity: (
    <>
      <p>The clarity of water is affected by something called turbidity. Turbidity can take the form of floating particles like clay, silt, algae, or sewage. More floating particles = greater turbidity. High turbidity is not necessarily unpleasant for swimming, but it does block the sunlight in the water which plants need to create more oxygen and aquatic life needs to breathe. High turbidity is also tough on some fish since all the funk can affect their vision and sense of smell.</p>
      <p>Turbidity is a pretty unique water quality parameter in that it’s visible. Unlike other parameters, you can see with your eyes whether water has high turbidity or low turbidity. The classic way to measure turbidity is to lower a black and white disc (known as a Secchi disc) into the water until it can no longer be seen from the surface.  Here, we measure it in what's called NTU, which stands for Nephelometric Turbidity Units simply because the instrument used for measuring it is called a nephelometer. This instrument traces the amount of light that can penetrate through the water. More light means turbidity is low. And less light? More funk in the water.</p>
    </>
  ),
  speed: (
    <p>Speed affects how fast (or how slow!) an area of water changes. Not related to the Keanue Reeves film(s)!</p>
  ),
  direction: (
    <>
      <p>The direction of the East River shifts pretty drastically a few times a day.  (She’s got a little uptown girl and a little downtown girl in her!)  Due mostly to the gravitational influence of the moon and the tides it creates, the East River floods (comes in) in an easterly and northerly direction direction for a little more than six hours, then ebbs (goes out) for six hours. Pretty cool!</p>
    </>
  ),
  ph: (
    <>
      <p>pH tells us whether water is acidic or basic. For good water quality, we don't want the pH to be too high or too low. pH is affected by all kinds of things, including rain and snow, which tend to be acidic. Wetlands and marshes tend to help keep pH balanced so let’s build more of those!</p>
      <p>A pH level below 4 or above 10 will kill most fish and very few animals can tolerate waters with a pH below 3 or above 11.</p>
    </>
  ),
  depth: (
    <p>The distance from the top of the water to the bottom of the riverbed. You might think this wouldn't change but because the East River is a tidal estuary, its changing all the time, just like the direction of the current!</p>
  )
}
