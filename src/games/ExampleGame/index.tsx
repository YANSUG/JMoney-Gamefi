import { GambaUi, useSound, useWagerInput } from 'gamba-react-ui-v2'
import React from 'react'
import SOUND from './test.mp3'

export default function ShootTheDragonGame() {
  const _hue = React.useRef(0)
  const [wager, setWager] = useWagerInput()
  const game = GambaUi.useGame()
  const sound = useSound({ test: SOUND })

  // 設定射龍門的初始牌號範圍
  const [firstCard, setFirstCard] = React.useState(null)
  const [secondCard, setSecondCard] = React.useState(null)
  const [resultCard, setResultCard] = React.useState(null)

  const click = () => {
    _hue.current = (_hue.current + 30) % 360
    sound.play('test', { playbackRate: .75 + Math.random() * .5 })
  }

  // 模擬發牌 (1 到 13 的數字，對應牌面)
  const drawCard = () => Math.floor(Math.random() * 13) + 1

  const play = async () => {
    setFirstCard(drawCard()) // 第一張牌
    setSecondCard(drawCard()) // 第二張牌

    await game.play({
      wager,
      bet: [firstCard, secondCard], // 下注第一張和第二張牌
    })

    // 第三張牌為遊戲結果
    const resultCard = drawCard()
    setResultCard(resultCard)

    const result = await game.result()
    console.log('Game result:', result)
    console.log('First Card:', firstCard)
    console.log('Second Card:', secondCard)
    console.log('Result Card:', resultCard)

    // 判斷第三張牌是否在第一和第二張牌之間 (射龍門)
    const isBetween = (resultCard > Math.min(firstCard, secondCard)) && (resultCard < Math.max(firstCard, secondCard))
    if (isBetween) {
      console.log('Congratulations! You win!')
    } else {
      console.log('Sorry! You lose.')
    }
  }

  return (
    <>
      <GambaUi.Portal target="screen">
        <GambaUi.Canvas
          render={({ ctx, size }, clock) => {
            const scale = 3 + Math.cos(clock.time) * .5
            const hue = _hue.current

            ctx.fillStyle = 'hsla(' + hue + ', 50%, 3%, 1)'
            ctx.fillRect(0, 0, size.width, size.height)

            ctx.save()
            ctx.translate(size.width / 2, size.height / 2)

            for (let i = 0; i < 5; i++) {
              ctx.save()
              ctx.scale(scale * (1 + i), scale * (1 + i))
              ctx.fillStyle = 'hsla(' + hue + ', 75%, 60%, .2)'
              ctx.beginPath()
              ctx.arc(0, 0, 10, 0, Math.PI * 2)
              ctx.fill()
              ctx.restore()
            }

            ctx.fillStyle = 'hsla(' + hue + ', 75%, 60%, 1)'
            ctx.beginPath()
            ctx.arc(0, 0, 8, 0, Math.PI * 2)
            ctx.fill()

            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.font = '32px Arial'

            ctx.fillStyle = 'hsla(' + hue + ', 75%, 90%, 1)'
            ctx.fillText('Shoot the Dragon', 0, 0)

            ctx.restore()
          }}
        />
      </GambaUi.Portal>
      <GambaUi.Portal target="controls">
        <GambaUi.WagerInput value={wager} onChange={setWager} />
        <GambaUi.Button onClick={click}>
          Play Sound
        </GambaUi.Button>
        <GambaUi.PlayButton onClick={play}>
          Play Shoot the Dragon
        </GambaUi.PlayButton>
        {firstCard && <div>First Card: {firstCard}</div>}
        {secondCard && <div>Second Card: {secondCard}</div>}
        {resultCard && <div>Result Card: {resultCard}</div>}
      </GambaUi.Portal>
    </>
  )
}
