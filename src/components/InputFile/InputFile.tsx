import { useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { config } from 'src/utils/constants'

interface InputFileProps {
  onChange?: (file?: File) => void
}

function InputFile({ onChange }: InputFileProps) {
  // const [file, setFile] = useState<File>()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = event.target.files?.[0]
    if (fileFromLocal && (fileFromLocal.size >= config.maxSizeUploadAvatar || !fileFromLocal.type.includes('image'))) {
      toast.error(`Dung lượng file tối đa 1MB, Định dạng:.JPEG, .PNG`, {
        position: 'top-center'
      })
    } else {
      // setFile(fileFromLocal)
      onChange && onChange(fileFromLocal)
    }
  }
  const handleUpload = () => {
    fileInputRef.current?.click()
  }
  return (
    <>
      <input
        type='file'
        accept='.jpg,.jpeg,.png'
        className='hidden'
        ref={fileInputRef}
        onChange={onFileChange}
        onClick={(event) => {
          ;(event.target as any).value = null // allow input type file select the same file
        }}
      />
      <button
        type='button'
        className='flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm'
        onClick={handleUpload}
      >
        Chọn ảnh
      </button>
    </>
  )
}

export default InputFile
