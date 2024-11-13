export enum Position {
  Leader = 'Visionary Leader',
  Enforcer = 'Enforcer',
  Operative = 'Swift Operative',
  Innovator = 'Innovator',
}

// Define an object to store metadata or descriptions for each position
export const PositionInfo: Record<Position, string> = {
  [Position.Leader]: 'This character possesses a powerful combination of charisma, strategic foresight, and a strong moral compass. They inspire the team, make tough calls, and see the “big picture” in every mission. Their powers could include limited precognition, enhanced persuasion, or even a unique bond with each team member, allowing them to amplify everyone’s abilities. They may not be the strongest or fastest, but their unwavering dedication to the mission and their team make them a respected leader.',
  [Position.Enforcer]: 'This character is the team’s powerhouse and frontline protector. They have incredible strength, resilience, and combat skills, making them perfect for handling direct threats and overwhelming enemies. The Enforcer might have super strength, advanced body armor, or the ability to absorb and channel energy, making them both a tank and a major offensive player.',
  [Position.Operative]: 'Agile, stealthy, and clever, this character specializes in quick, surgical interventions. They excel at recon, sabotage, and finding creative solutions in high-stakes situations. Powers could include super speed, short-range teleportation, or heightened reflexes. The Swift Operative can dart in and out of danger, delivering critical intel or rescuing civilians as needed.',
  [Position.Innovator]: 'A tech genius or mystical expert, this hero fills any gaps with their resourcefulness. They create gadgets, enhance the team’s abilities with technology or magic, and solve complex problems the others might overlook. The Innovator’s powers might be based on advanced tech (like drones, holograms, or cyber interfaces) or mystical knowledge that allows them to control energy fields or even access alternate dimensions for quick escapes or reinforcements.',
};

export type SelectedPositionResult = [Position, (position: Position) => void];
