import { readFile } from "fs/promises"

const parseOSReleaseLine = (line: string): {
    key: string, 
    value: string
    } => {
        const key = line.split("=")[0]
        const segment = line.split("=")[1]
        if (!segment.startsWith('"')){
            return {key:key, value:segment}
        }
        const regexp = RegExp('"(.*)"')
        const result = regexp.exec(segment)

        return {key:key, value:result!![1]}
}

/**
 * This function parses the /etc/os-release file and get the current
 *  distro id but also other distro ids that are similiar "ID_LIKE".
 * Eg: Ubuntu returns a list containg: "ubuntu" and "debian" (due to ID_LIKE)
 * @returns A list of distro IDs
 */
export async function getDistroID(): Promise<string[]>{
    const file = await readFile("/etc/os-release", "utf-8")
    const lines = file.split("\n").filter((value) => value != "")
    const distroIDs: string[] = []

    for(let line of lines){
        const parsedLine = parseOSReleaseLine(line)
        if(parsedLine.key == "ID"){
            distroIDs.push(parsedLine.value)
        }
        if(parsedLine.key == "ID_LIKE"){
            distroIDs.push(...parsedLine.value.split(" "))
        }
    }

    return distroIDs
}