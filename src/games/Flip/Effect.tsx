import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import React from 'react'
import * as THREE from 'three'

import TEXTURE_STAR from './star.png'

const tmp = new THREE.Object3D

const STARS = 15  // 星星數量

function getRandomColor() {
  // 隨機生成 RGB 顏色
  return new THREE.Color(Math.random(), Math.random(), Math.random())
}

export const Effect = () => {
  const texture = useTexture(TEXTURE_STAR)
  const mesh = React.useRef<THREE.InstancedMesh>(null!)
  const animation = React.useRef(0)
  const colors = React.useMemo(() => {
    // 預生成隨機顏色數組，每顆星星一個顏色
    return new Float32Array(STARS * 3).map(() => Math.random())
  }, [])

  useFrame(() => {
    for (let i = 0; i < STARS; i++) {
      const angle = i / STARS * Math.PI * 2
      const ssss = .5 + (1 + Math.cos(i)) * 2
      tmp.rotation.z = i + Date.now() * .001
      tmp.scale.setScalar(ssss * animation.current * 1 * (1 - animation.current))
      const len = 1 + 2 * animation.current
      tmp.position.set(
        Math.cos(angle) * len,
        Math.sin(angle) * len,
        0,
      )
      tmp.updateMatrix()
      mesh.current.setMatrixAt(i, tmp.matrix)
    }
    mesh.current.instanceMatrix.needsUpdate = true
    animation.current += (1 - animation.current) * .1
  })

  return (
    <instancedMesh
      ref={mesh}
      args={[undefined, undefined, STARS]}
      position-z={-1}
    >
      <planeGeometry />
      <meshBasicMaterial 
        transparent 
        map={texture} 
        vertexColors // 啟用每個實例的頂點顏色
      />
      <instancedBufferAttribute 
        attachObject={['attributes', 'color']} 
        args={[colors, 3]} // 每個實例的顏色屬性
      />
    </instancedMesh>
  )
}
