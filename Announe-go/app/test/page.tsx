"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui"
import { Button } from "@/components/ui"
import { FieldSet, FieldLegend, FieldGroup, Field, FieldContent, FieldLabel, FieldDescription, FieldSeparator, FieldError } from "@/components/ui"
import { Input } from "@/components/ui"
import { Checkbox } from "@/components/ui/checkbox"
import userDataJson from "@/app/test/userData.json"

function TestPage() { 
  const [userData, setUserData] = useState<any | null>(null)
  


  const fetchUserData = () => {
    const { data } = userDataJson
    setUserData(data)

    
  }

  useEffect(() => {
    fetchUserData()

    setTimeout(() => {
      console.log("userData: ", userData)
    }, 1000)
  }, [])
  

  const submit = () => {
    console.log("userData: ", userData)
  }

  const checkHobby = (id: number,name: string, checked: string | boolean) => {
    console.log("id: ", id, "name: ", name, "checked: ", checked)
    if(checked) {
      setUserData((prev)=> {
        return {
            ...prev,
            hobbies: [...prev.hobbies, name]
        }
      })

    } else {  
      setUserData((prev)=> {
        return {
            ...prev,
            hobbies: [...prev.hobbies.filter(item => item !== name)]
        }
    })
    }
  }

  return (
    <div>
      <h1>TestPage</h1>
      <Card>
        <CardHeader>
          <CardTitle>User Data</CardTitle>
        </CardHeader>
        <CardContent>
          <FieldSet>
            <FieldGroup>
              <Field>
                <Input type="text" value={userData?.name || ''} disabled />
              </Field>
              <Field>
                <Input type="text" value={userData?.mobilePhoneNo || ''} disabled />
              </Field>
              <Field>
                <Input type="text" value={userData?.birthday || ''} disabled />
              </Field>
              <Field>
                <Input type="text" value={userData?.memberType || ''} disabled />
              </Field>
              <Field>
                <Input type="text" value={userData?.email || ''} disabled />
              </Field>
              <Field>
                <Input type="text" value={userData?.zipCode || ''} disabled />
              </Field>
              <Field>
                <Input type="text" value={userData?.address || ''} disabled />
              </Field>
              <Field>
                <FieldLabel>Hobbies</FieldLabel>
                <FieldGroup>
                  {
                    userData?.hobbiList.map((hobby: any) => (
                      <div key={hobby.id}>
                        <Checkbox key={hobby.id} checked={userData?.hobbies.includes(hobby.name)}
                          onCheckedChange={(checked) => {
                            checkHobby(hobby.id, hobby.name, checked)
                          }}
                        />
                        <span>{hobby.name}</span>
                      </div>
                    ))
                  }
                </FieldGroup>
              </Field>
              <Field>
                <Button onClick={submit}>Test</Button>
              </Field>
            </FieldGroup>
          </FieldSet>

          
        </CardContent>
      </Card>
    </div>
  )
}

export default TestPage






