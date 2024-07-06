import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface Notification{
    message:string | null | undefined
}
export function NotificationAuth(props:Notification) {
  return (
    <div>
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" />
        <Label htmlFor="terms" className="text-red-300">{props.message}</Label>
      </div>
    </div>
  )
}
