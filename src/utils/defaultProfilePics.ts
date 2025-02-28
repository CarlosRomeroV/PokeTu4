export function getRandomPic():string{

    const num = (Math.round)(Math.random()*10);

    if (num===0) return 'https://raw.githubusercontent.com/PMDCollab/SpriteCollab/master/portrait/0001/Normal.png'
    if (num===1) return 'https://raw.githubusercontent.com/PMDCollab/SpriteCollab/master/portrait/0006/Normal.png'
    if (num===2) return 'https://raw.githubusercontent.com/PMDCollab/SpriteCollab/master/portrait/0025/Normal.png'
    if (num===3) return 'https://raw.githubusercontent.com/PMDCollab/SpriteCollab/master/portrait/0019/Normal.png'
    if (num===4) return 'https://raw.githubusercontent.com/PMDCollab/SpriteCollab/master/portrait/0150/Normal.png'
    if (num===5) return 'https://raw.githubusercontent.com/PMDCollab/SpriteCollab/master/portrait/0151/Normal.png'
    if (num===6) return 'https://raw.githubusercontent.com/PMDCollab/SpriteCollab/master/portrait/0008/Normal.png'
    if (num===7) return 'https://raw.githubusercontent.com/PMDCollab/SpriteCollab/master/portrait/0133/Normal.png'
    if (num===8) return 'https://raw.githubusercontent.com/PMDCollab/SpriteCollab/master/portrait/0143/Normal.png'
    if (num===9) return 'https://raw.githubusercontent.com/PMDCollab/SpriteCollab/master/portrait/0094/Normal.png'

    return 'https://raw.githubusercontent.com/PMDCollab/SpriteCollab/master/portrait/0001/Normal.png'
}