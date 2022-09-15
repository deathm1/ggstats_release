// Pages
import Achievements from './Elements/Achievements'
import GameStatistics from './Elements/GameStatistics'
import Matches from './Elements/Matches'
import KillDeath from './Elements/KillDeath'

export default function Dashboard(props) {
  return (
    <>
      <Matches stats={props.stats} />
      <KillDeath stats={props.stats} />
      <Achievements achievements={props.achievements} />
      <GameStatistics stats={props.stats} />
    </>
  )
}
