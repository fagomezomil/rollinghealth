import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

const TableSkeleton = ({cols}) => {
  return (
    Array(cols).fill(0).map((_, i) => (
      <div key={i}>
        <SkeletonTheme baseColor='#3a3a' highlightColor='#f0f'>
          <Skeleton />
        </SkeletonTheme>
      </div>
    ))
  )
}

export default TableSkeleton