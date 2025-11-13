


import { builderInfoSelector } from "./slices/builderInfo/builderInfo.selector"
import { configSelector } from "./slices/config/config.selector"
import { currentAppSelector } from "./slices/currentApp/currentApp.selector"
import { resourceSelector } from "./slices/resource/resource.selector"
import { currentUserSelector } from "./slices/userInfo/currentUser/currentUser.selector"
import { teamSelector } from "./slices/userInfo/team/team.selector"


export const rootSelector = () => {


  const { builderInfoContext } = builderInfoSelector()
  const { configContext } = configSelector()

  const { currentApp } = currentAppSelector()
  const { resourceContext } = resourceSelector()
  const { currentUserContext } = currentUserSelector()
  const { teamContext } = teamSelector()

  return {
    root: {
      builder: {
        builderInfo: builderInfoContext,
        config: configContext,
        currentApp: currentApp,
        resource: resourceContext,
        currentUser: currentUserContext,
        team: teamContext,
      }
    },
  }
}
